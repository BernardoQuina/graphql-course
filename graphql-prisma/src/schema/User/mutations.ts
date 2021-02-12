import { mutationField, nonNull, stringArg } from 'nexus'
import bcrypt from 'bcryptjs'
import { getUserId } from '../../util/getUserId'
import { generateToken } from '../../util/generateToken'

export const createUser = mutationField('createUser', {
  type: 'AuthPayload',
  args: {
    name: nonNull(stringArg()),
    email: nonNull(stringArg()),
    password: nonNull(stringArg()),
    confirmPassword: nonNull(stringArg())
  },
  async resolve(_root, { name, email, password, confirmPassword }, { prisma }) {
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

    return {
      user: newUser,
      token: generateToken(newUser.id)
    }
  },
})

export const loginUser = mutationField('loginUser', {
  type: 'AuthPayload',
  args: {
    email: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  async resolve(_root, { email, password }, { prisma }) {
    const userExists = await prisma.user.findUnique({ where: { email } })

    if (!userExists) {
      throw new Error('Invalid credentials.')
    }

    const isMatch = await bcrypt.compare(password, userExists.password)

    if (!isMatch) {
      throw new Error('Invalid credentials.')
    }

    return {
      user: userExists,
      token: generateToken(userExists.id)
    }
  },
})

export const updateUser = mutationField('updateUser', {
  type: 'User',
  args: {
    password: nonNull(stringArg()),
    updateName: stringArg(),
    updateEmail: stringArg(),
    updatePassword: stringArg(),
    confirmNewPassword: stringArg(),
  },
  async resolve(
    _root,
    { password, updateName, updateEmail, updatePassword, confirmNewPassword },
    { prisma, pubsub, request }
  ) {
    const userId = getUserId(request)

    const userExists = await prisma.user.findUnique({ where: { id: userId } })

    if (!userExists) {
      throw new Error('User not found')
    }

    const isMatch = await bcrypt.compare(password, userExists.password)

    if (!isMatch) {
      throw new Error('Invalid credentials.')
    }

    let data: { email?: string; name?: string; password?: string } = {}

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
    password: nonNull(stringArg()),
  },
  async resolve(_root, { password }, { prisma, pubsub, request }) {
    const userId = getUserId(request)

    const userExists = await prisma.user.findUnique({ where: { id: userId } })

    if (!userExists) {
      throw new Error('User not found')
    }

    const isMatch = await bcrypt.compare(password, userExists.password)

    if (!isMatch) {
      throw new Error('Invalid credentials')
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
