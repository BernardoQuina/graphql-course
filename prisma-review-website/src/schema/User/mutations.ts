import { mutationField, nonNull, stringArg, idArg } from 'nexus'

export const createUser = mutationField('createUser', {
  type: 'User',
  args: {
    name: nonNull(stringArg()),
    email: nonNull(stringArg()),
    role: nonNull('role'),
  },
  async resolve(_root, { name, email, role }, { prisma }) {
    const emailTaken = await prisma.user.findUnique({ where: { email } })

    if (emailTaken) {
      throw new Error('An account is already using this email')
    }

    return prisma.user.create({ data: { name, email, role } })
  },
})

export const updateUser = mutationField('updateUser', {
  type: 'User',
  args: {
    whereId: nonNull(idArg()),
    updateName: stringArg(),
    updateEmail: stringArg(),
  },
  async resolve(_root, { whereId, updateEmail, updateName }, { prisma, pubsub }) {
    const userExists = await prisma.user.findUnique({ where: { id: whereId } })

    if (!userExists) {
      throw new Error('User not found')
    }

    let data: { name?: string; email?: string } = {}

    if (updateName) {
      data.name = updateName
    }

    if (updateEmail) {
      data.email = updateEmail
    }

    if (!updateName && !updateEmail) {
      throw new Error('Please provide something to update')
    }

    const updatedUser = await prisma.user.update({ where: { id: whereId }, data })

    pubsub.publish(`user ${whereId}`, {
      mutation: 'UPDATED',
      data: updatedUser
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

    if (userExists.role === 'CONSUMER') {
      await prisma.review.deleteMany({ where: { userId: id } })
    }

    if (userExists.role === 'VENDOR') {
      await prisma.book.deleteMany({ where: { userId: id } })
    }

    pubsub.publish(`user ${id}`, {
      mutation: 'DELETED',
      data: userExists
    })

    return prisma.user.delete({ where: { id } })
  },
})