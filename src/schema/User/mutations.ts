import { mutationField, nonNull, stringArg } from 'nexus'
import bcrypt from 'bcryptjs'
import { v4 } from 'uuid'
import { isAuth } from '../../util/isAuth'
import { sendEmail } from '../../util/sendEmail'

export const createUser = mutationField('createUser', {
  type: 'User',
  args: {
    name: nonNull(stringArg()),
    email: nonNull(stringArg()),
    password: nonNull(stringArg()),
    confirmPassword: nonNull(stringArg()),
  },
  async resolve(
    _root,
    { name, email, password, confirmPassword },
    { prisma, req }
  ) {
    if (name.length < 2) {
      throw new Error('Name must be 2 characters or longer.')
    }

    if (email.length < 4) {
      throw new Error('Please provide a valid email.')
    }

    if (password.length < 8) {
      throw new Error('Password must be 8 characters or longer.')
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const emailTaken = await prisma.user.findUnique({ where: { email } })

    if (emailTaken) {
      throw new Error('An account is already using this email')
    }

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    })

    req.session.userId = newUser.id

    return newUser
  },
})

export const loginUser = mutationField('loginUser', {
  type: 'User',
  args: {
    email: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  async resolve(_root, { email, password }, { prisma, req }) {
    const userExists = await prisma.user.findUnique({ where: { email } })

    if (!userExists || !userExists.password) {
      throw new Error('Invalid credentials.')
    }

    const isMatch = await bcrypt.compare(password, userExists.password)

    if (!isMatch) {
      throw new Error('Invalid credentials.')
    }

    req.session.userId = userExists.id

    return userExists
  },
})

// oAuth logout
export const logoutUser = mutationField('logoutUser', {
  type: 'Boolean',
  async resolve(_root, _args, { req, res }) {
    if (req.user || req.session.userId) {
      req.logOut()
      return new Promise((resolve) =>
        req.session.destroy((err) => {
          res.clearCookie('connect.sid', { path: '/' })
          if (err) {
            console.log(err)
            resolve(false)
            return
          }
          resolve(true)
        })
      )
    }
    return true
  },
})

export const updateUser = mutationField('updateUser', {
  type: 'User',
  args: {
    password: nonNull(stringArg()),
    updateName: stringArg(),
    updatePhoto: stringArg(),
    updateEmail: stringArg(),
    updatePassword: stringArg(),
    confirmNewPassword: stringArg(),
  },
  async resolve(
    _root,
    {
      password,
      updateName,
      updatePhoto,
      updateEmail,
      updatePassword,
      confirmNewPassword,
    },
    context
  ) {
    const userId = isAuth(context)

    const userExists = await context.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!userExists) {
      throw new Error('User not found')
    }

    const isMatch = await bcrypt.compare(password, userExists.password!)

    if (!isMatch) {
      throw new Error('Invalid credentials.')
    }

    let data: {
      email?: string
      photo?: string
      name?: string
      password?: string
    } = {}

    if (updatePhoto) {
      data.photo = updatePhoto
    }

    if (updateEmail) {
      data.email = updateEmail
    }

    if (updateName) {
      data.name = updateName
    }

    if (updatePassword) {
      if (updatePassword !== confirmNewPassword) {
        throw new Error('Passwords do not match.')
      }

      if (updatePassword.length < 8) {
        throw new Error('Password must be 8 characters or longer.')
      }

      const newHashedPassword = await bcrypt.hash(updatePassword, 10)

      data.password = newHashedPassword
    }

    if (!updateName && !updateEmail && !updatePassword) {
      throw new Error('Please provide something to update')
    }

    const updatedUser = await context.prisma.user.update({
      where: { id: userId },
      data,
    })

    context.pubsub.publish(`user ${userId}`, {
      mutation: 'UPDATED',
      data: updatedUser,
    })

    return updatedUser
  },
})

export const deleteUser = mutationField('deleteUser', {
  type: 'User',
  args: {
    password: stringArg(),
  },
  async resolve(_root, { password }, context) {
    const userId = isAuth(context)

    const userExists = await context.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!userExists) {
      throw new Error('User not found')
    }

    if (!userExists.googleId && !userExists.facebookId) {
      if (!password) {
        throw new Error('Invalid credentials.')
      }

      const isMatch = await bcrypt.compare(password, userExists.password!)

      if (!isMatch) {
        throw new Error('Invalid credentials')
      }
    }

    await context.prisma.comment.deleteMany({ where: { post: { userId } } })
    await context.prisma.like.deleteMany({ where: { post: { userId } } })
    await context.prisma.post.deleteMany({ where: { userId } })
    await context.prisma.comment.deleteMany({ where: { userId } })
    await context.prisma.like.deleteMany({ where: { userId } })
    await context.prisma.notification.deleteMany({
      where: { receiverId: userId },
    })
    await context.prisma.notification.deleteMany({
      where: { dispatcherId: userId },
    })

    context.pubsub.publish(`user ${userId}`, {
      mutation: 'DELETED',
      data: userExists,
    })

    return context.prisma.user.delete({ where: { id: userId } })
  },
})

export const forgotPassword = mutationField('forgotPassword', {
  type: 'Boolean',
  args: {
    email: nonNull(stringArg()),
  },
  async resolve(_root, { email }, { prisma, redis }) {
    if (email.length < 4) {
      throw new Error('Please provide a valid email.')
    }

    const userExists = await prisma.user.findUnique({ where: { email } })

    if (!userExists || userExists.googleId || userExists.facebookId) {
      return true // We don't want to disclose to anyone whether a user exists or not
    }

    const token = v4()

    await redis.set(
      process.env.FORGOT_PASSWORD_PREFIX + token,
      userExists.id,
      'ex',
      1000 * 60 * 60 * 24 * 3 // 3 days
    )

    sendEmail(
      email,
      `<a href=${process.env.ORIGIN}/change-password/${token}>reset password</a>`
    )

    return true
  },
})

export const changePassword = mutationField('changePassword', {
  type: 'User',
  args: {
    token: nonNull(stringArg()),
    newPassword: nonNull(stringArg()),
    confirmPassword: nonNull(stringArg()),
  },
  async resolve(
    _root,
    { token, newPassword, confirmPassword },
    { prisma, redis, req }
  ) {
    if (newPassword !== confirmPassword) {
      throw new Error('Passwords do not match.')
    }

    if (newPassword.length < 8) {
      throw new Error('Password must be 8 characters or longer.')
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10)

    const userId = await redis.get(process.env.FORGOT_PASSWORD_PREFIX + token)

    if (!userId) {
      throw new Error('Token expired.')
    }

    const userExists = await prisma.user.findUnique({ where: { id: userId } })

    if (!userExists) {
      throw new Error('User no longer exists.')
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password: newHashedPassword },
    })

    req.session.userId = userExists.id

    redis.del(process.env.FORGOT_PASSWORD_PREFIX + token) // expire token

    return updatedUser
  },
})

export const follow = mutationField('follow', {
  type: 'User',
  args: {
    userId: nonNull(stringArg()),
  },
  async resolve(_root, { userId }, context) {
    const myId = isAuth(context) as string

    const userExists = await context.prisma.user.findUnique({
      where: { id: myId },
    })

    if (!userExists) {
      throw new Error('User not found.')
    }

    const userToFollowExists = await context.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!userToFollowExists) {
      throw new Error('User not found.')
    }

    await context.prisma.user.update({
      where: { id: myId },
      data: { following: { connect: { id: userId } } },
    })

    await context.prisma.notification.create({
      data: {
        receiverId: userId,
        dispatcherId: myId,
        message: `${userExists.name} followed you.`,
        link: `/user/${myId}`,
      },
    })

    return userToFollowExists
  },
})

export const unfollow = mutationField('unfollow', {
  type: 'User',
  args: {
    userId: nonNull(stringArg()),
  },
  async resolve(_root, { userId }, context) {
    const myId = isAuth(context) as string

    const userToUnfollowExists = await context.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!userToUnfollowExists) {
      throw new Error('User not found.')
    }

    await context.prisma.user.update({
      where: { id: myId },
      data: { following: { disconnect: { id: userId } } },
    })

    return userToUnfollowExists
  },
})
