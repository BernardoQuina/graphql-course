import { mutationField, nonNull, stringArg, idArg } from 'nexus'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

jwt.sign({ id: 46 }, process.env.JWT_SECRET)

export const createUser = mutationField('createUser', {
  type: 'User',
  args: {
    name: nonNull(stringArg()),
    email: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  async resolve(_root, { name, email, password }, { prisma }) {
    if (password.length < 8) {
      throw new Error('Password must be 8 characters or longer.')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const emailTaken = await prisma.user.findUnique({ where: { email } })

    if (emailTaken) {
      throw new Error('An account is already using this email')
    }

    return prisma.user.create({
      data: { name, email, password: hashedPassword },
    })
  },
})

export const updateUser = mutationField('updateUser', {
  type: 'User',
  args: {
    whereId: nonNull(idArg()),
    updateName: stringArg(),
    updateEmail: stringArg(),
  },
  async resolve(
    _root,
    { whereId, updateName, updateEmail },
    { prisma, pubsub }
  ) {
    const userExists = await prisma.user.findUnique({ where: { id: whereId } })

    if (!userExists) {
      throw new Error('User not found')
    }

    let data: { email?: string; name?: string } = {}

    if (updateEmail) {
      data.email = updateEmail
    }

    if (updateName) {
      data.name = updateName
    }

    if (!updateName && !updateEmail) {
      throw new Error('Please provide something to update')
    }

    const updatedUser = await prisma.user.update({
      where: { id: whereId },
      data,
    })

    pubsub.publish(`user ${whereId}`, {
      mutation: 'UPDATED',
      data: updatedUser,
    })

    return updatedUser
  },
})

export const deleteUser = mutationField('deleteUser', {
  type: 'User',
  args: {
    id: nonNull(idArg()),
  },
  async resolve(_root, { id }, { prisma, pubsub }) {
    const userExists = await prisma.user.findUnique({ where: { id } })

    if (!userExists) {
      throw new Error('User not found')
    }

    await prisma.comment.deleteMany({ where: { userId: id } })

    await prisma.post.deleteMany({ where: { userId: id } })

    pubsub.publish(`user ${id}`, {
      mutation: 'DELETED',
      data: userExists,
    })

    return prisma.user.delete({ where: { id } })
  },
})
