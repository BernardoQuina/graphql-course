import { Post } from '@prisma/client'
import { idArg, nonNull, objectType, subscriptionField } from 'nexus'
import { isAuth } from '../../util/isAuth'

export const postSubResponse = objectType({
  name: 'postSubResponse',
  definition(t) {
    t.field('mutation', {
      type: 'String',
    }),
      t.field('data', {
        type: 'Post',
      })
  },
})

export const postSubByUser = subscriptionField('postSubByUser', {
  type: 'postSubResponse',
  args: {
    userId: nonNull(idArg()),
  },
  async subscribe(_, { userId }, { prisma, pubsub }) {
    const userExists = await prisma.user.findUnique({ where: { id: userId } })

    if (!userExists) {
      throw new Error('User not found.')
    }

    return pubsub.asyncIterator(`post from user ${userId}`)
  },
  resolve(payload: { mutation: string; data: Post }) {
    return payload
  },
})

export const postSub = subscriptionField('postSub', {
  type: 'postSubResponse',
  args: {
    postId: nonNull(idArg()),
  },
  async subscribe(_root, { postId }, { prisma, pubsub }) {
    const postExists = await prisma.post.findUnique({ where: { id: postId } })

    if (!postExists) {
      throw new Error('post not found')
    }

    return pubsub.asyncIterator(`post ${postId}`)
  },
  resolve(payload: { mutation: string; data: Post }) {
    return payload
  },
})

export const myPostSub = subscriptionField('myPostSub', {
  type: 'postSubResponse',
  async subscribe(_root, _args, { pubsub, connection }) {
    // This wont work
    const userId = isAuth(connection as any) 
    // Still have to figure out how to pass the user via ws connection

    return pubsub.asyncIterator(`post from user ${userId}`)
  },
  resolve(payload: { mutation: string; data: Post }) {
    return payload
  },
})
