import { Comment } from '@prisma/client'
import { idArg, nonNull, objectType, subscriptionField } from 'nexus'

export const commentSubResponse = objectType({
  name: 'commentSubResponse',
  definition(t) {
    t.field('mutation', {
      type: 'String',
    }),
      t.field('data', {
        type: 'Comment',
      })
  },
})

export const commentSubByUser = subscriptionField('commentSubByUser', {
  type: 'commentSubResponse',
  args: {
    userId: nonNull(idArg()),
  },
  async subscribe(_root, { userId }, { prisma, pubsub }) {
    const userExists = await prisma.user.findUnique({ where: { id: userId } })

    if (!userExists) {
      throw new Error('User not found.')
    }

    return pubsub.asyncIterator(`comment from user ${userId}`)
  },
  resolve(payload: { mutation: string; data: Comment }) {
    return payload
  },
})

export const commentSubByPost = subscriptionField('commentSubByPost', {
  type: 'commentSubResponse',
  args: {
    postId: nonNull(idArg()),
  },
  async subscribe(_, { postId }, { prisma, pubsub }) {
    const PostExists = await prisma.post.findUnique({ where: { id: postId } })

    if (!PostExists) {
      throw new Error('Post not found.')
    }

    return pubsub.asyncIterator(`comment from post ${postId}`)
  },
  resolve(payload: { mutation: string; data: Comment }) {
    return payload
  },
})

export const commentSub = subscriptionField('commentSub', {
  type: 'commentSubResponse',
  args: {
    commentId: nonNull(idArg()),
  },
  async subscribe(_root, { commentId }, { prisma, pubsub }) {
    const commentExists = await prisma.comment.findUnique({
      where: { id: commentId },
    })

    if (!commentExists) {
      throw new Error('comment not found.')
    }

    return pubsub.asyncIterator(`comment ${commentId}`)
  },
  resolve(payload: { mutation: string; data: Comment }) {
    return payload
  },
})
