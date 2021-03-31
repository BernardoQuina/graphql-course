import { mutationField, nonNull, stringArg } from 'nexus'
import { isAuth } from '../../util/isAuth'
import { pubsubPublishMany } from '../../util/pubsubMany'

export const createComment = mutationField('createComment', {
  type: 'Comment',
  args: {
    postId: nonNull(stringArg()),
    text: nonNull(stringArg()),
  },
  async resolve(_root, { postId, text }, context) {
    const postExists = await context.prisma.post.findUnique({
      where: { id: postId },
    })

    const userId = isAuth(context) as string

    const userExists = await context.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!userExists) {
      throw new Error('Authentication Required.')
    }

    if (
      !postExists ||
      (!postExists.published && postExists.userId !== userId)
    ) {
      throw new Error('Post not found')
    }

    const createdComment = await context.prisma.comment.create({
      data: {
        text,
        author: { connect: { id: userId } },
        post: { connect: { id: postId } },
      },
    })

    // send notification to post author

    if (postExists.userId === userId) return createdComment // self like, no notification

    await context.prisma.notification.create({
      data: {
        receiverId: postExists.userId,
        dispatcherId: userId,
        message: `${userExists.name} replied to your post.`,
        link: `/post/${postId}`,
        createdAt: new Date(),
      },
    })

    pubsubPublishMany(
      context.pubsub,
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
  async resolve(_root, { whereId, updateText }, context) {
    const commentExists = await context.prisma.comment.findUnique({
      where: { id: whereId },
    })

    if (!commentExists) {
      throw new Error('Comment not found')
    }

    const userId = isAuth(context)

    if (userId !== commentExists.userId) {
      throw new Error('Invalid credentials.')
    }

    const updatedComment = await context.prisma.comment.update({
      where: { id: whereId },
      data: { text: updateText },
    })

    pubsubPublishMany(
      context.pubsub,
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
  async resolve(_root, { id }, context) {
    const commentExists = await context.prisma.comment.findUnique({
      where: { id },
    })

    if (!commentExists) {
      throw new Error('Comment not found.')
    }

    const userId = isAuth(context)

    if (userId !== commentExists.userId) {
      throw new Error('Invalid credentials.')
    }

    pubsubPublishMany(
      context.pubsub,
      [
        `comment ${id}`,
        `comment from user ${commentExists.userId}`,
        `comment from post ${commentExists.postId}`,
      ],
      { mutation: 'DELETED', data: commentExists }
    )

    return context.prisma.comment.delete({ where: { id } })
  },
})
