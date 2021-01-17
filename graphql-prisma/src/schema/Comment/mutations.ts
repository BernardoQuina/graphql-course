import { mutationField, nonNull, stringArg } from 'nexus'
import { pubsubPublishMany } from '../../util/pubsubMany'

export const createComment = mutationField('createComment', {
  type: 'Comment',
  args: {
    userId: nonNull(stringArg()),
    postId: nonNull(stringArg()),
    text: nonNull(stringArg()),
  },
  async resolve(_root, { userId, postId, text }, { prisma, pubsub }) {
    const userExists = await prisma.user.findUnique({ where: { id: userId } })

    if (!userExists) {
      throw new Error('User not found')
    }

    const postExists = await prisma.post.findUnique({ where: { id: postId } })

    if (!postExists) {
      throw new Error('Post not found')
    }

    const createdComment = await prisma.comment.create({
      data: {
        text,
        author: { connect: { id: userId } },
        post: { connect: { id: postId } },
      },
    })

    pubsubPublishMany(
      pubsub,
      [`comment from user ${userId}`, `comment from post ${postId}`],
      { mutation: 'CREATED', data: createdComment }
    )

    return createdComment
  },
})

export const updateComment = mutationField('updateComment', {
  type: 'Comment',
  args: {
    whereId: nonNull(stringArg()),
    updateText: nonNull(stringArg()),
  },
  async resolve(_root, { whereId, updateText }, { prisma, pubsub }) {
    const commentExists = await prisma.comment.findUnique({
      where: { id: whereId },
    })

    if (!commentExists) {
      throw new Error('Comment not found')
    }

    const updatedComment = await prisma.comment.update({
      where: { id: whereId },
      data: { text: updateText },
    })

    pubsubPublishMany(
      pubsub,
      [
        `comment ${whereId}`,
        `comment from post ${updatedComment.postId}`,
        `comment from user ${updatedComment.userId}`,
      ],
      { mutation: 'UPDATED', data: updatedComment }
    )

    return updatedComment
  },
})

export const deleteComment = mutationField('deleteComment', {
  type: 'Comment',
  args: {
    id: nonNull(stringArg()),
  },
  async resolve(_root, { id }, { prisma, pubsub }) {
    const commentExists = await prisma.comment.findUnique({ where: { id } })

    if (!commentExists) {
      throw new Error('Comment not found')
    }

    pubsubPublishMany(
      pubsub,
      [
        `comment ${id}`,
        `comment from user ${commentExists.userId}`,
        `comment from post ${commentExists.postId}`,
      ],
      { mutation: 'DELETED', data: commentExists }
    )

    return prisma.comment.delete({ where: { id } })
  },
})
