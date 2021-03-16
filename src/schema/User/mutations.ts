import { mutationField, nonNull, stringArg } from 'nexus'
import bcrypt from 'bcryptjs'
import { isAuth } from '../../util/isAuth'

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
  async resolve(_root, _args, { req }) {
    if (req.user || req.session.userId) {
      req.logOut()
      return new Promise((resolve) =>
        req.session.destroy((err) => {
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
    { prisma, pubsub, req }
  ) {
    const userId = isAuth(req)

    const userExists = await prisma.user.findUnique({ where: { id: userId } })

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

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    })

    pubsub.publish(`user ${userId}`, {
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
  async resolve(_root, { password }, { prisma, pubsub, req }) {
    const userId = isAuth(req)

    const userExists = await prisma.user.findUnique({ where: { id: userId } })

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

    await prisma.comment.deleteMany({ where: { userId } })

    await prisma.post.deleteMany({ where: { userId } })

    pubsub.publish(`user ${userId}`, {
      mutation: 'DELETED',
      data: userExists,
    })

    return prisma.user.delete({ where: { id: userId } })
  },
})
