import { User } from '@prisma/client'
import { idArg, nonNull, objectType, subscriptionField } from 'nexus'

export const userSubResponse = objectType({
  name: 'userSubResponse',
  definition(t) {
    t.field('mutation', {
      type: 'String',
    }),
      t.field('data', {
        type: 'User',
      })
  },
})

export const userSub = subscriptionField('userSub', {
  type: 'userSubResponse',
  args: {
    userId: nonNull(idArg()),
  },
  async subscribe(_, { userId }, { prisma, pubsub }) {
    const userExists = await prisma.user.findUnique({ where: { id: userId } })

    if (!userExists) {
      throw new Error('User not found.')
    }

    console.log(pubsub)

    return pubsub.asyncIterator(`user ${userId}`)
  },
  resolve(payload: { mutation: string; data: User }) {
    return payload
  },
})