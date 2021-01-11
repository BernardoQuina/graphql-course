import { idArg, mutationField, nonNull, objectType, stringArg } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
  },
})

export const createUser = mutationField('createUser', {
  type: User,
  args: { name: nonNull(stringArg()) },
  resolve(_root, { name }, { prisma }) {
    return prisma.user.create({ data: { name } })
  },
})

export const deleteUser = mutationField('deleteUser', {
  type: User,
  args: {
    id: nonNull(idArg()),
  },
  resolve(_root, { id }, { prisma }) {
    return prisma.user.delete({ where: { id } })
  },
})

export const updateUser = mutationField('updateUser', {
  type: User,
  args: {
    whereId: nonNull(idArg()),
    updateName: 'String',
  },
  resolve(_root, { whereId, updateName }, { prisma }) {
    if (updateName) {
      return prisma.user.update({
        where: { id: whereId },
        data: { name: updateName },
      })
    } else {
      throw new Error('Please provide something to update')
    }
  },
})
