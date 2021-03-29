import { Post } from '@prisma/client'
import { nonNull, objectType, stringArg, subscriptionField } from 'nexus'
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
    userId: nonNull(stringArg()),
  },
  async subscribe(_, { userId }, context) {

    const myId = isAuth(context)

    console.log('my id: ', myId)

    const userExists = await context.prisma.user.findUnique({ where: { id: userId } })

    if (!userExists) {
      throw new Error('User not found.')
    }

    return context.pubsub.asyncIterator(`post from user ${userId}`)
  },
  resolve(payload: { mutation: string; data: Post }) {
    return payload
  },
})

export const postSub = subscriptionField('postSub', {
  type: 'postSubResponse',
  args: {
    postId: nonNull(stringArg()),
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
  async subscribe(_root, _args, context) {
    const userId = isAuth(context)

    return context.pubsub.asyncIterator(`post from user ${userId}`)
  },
  resolve(payload: { mutation: string; data: Post }) {
    return payload
  },
})
