import { mutationField, nonNull, stringArg } from 'nexus'
import { isAuth } from '../../util/isAuth'

export const likePost = mutationField('likePost', {
  type: 'Like',
  args: {
    postId: nonNull(stringArg()),
  },
  async resolve(_root, { postId }, context) {
    const postExists = await context.prisma.post.findUnique({
      where: { id: postId },
    })

    const userId = isAuth(context) as string // It will throw an error otherwise

    const userExists = await context.prisma.user.findUnique({
      where: { id: userId },
    })

    if (!userExists) {
      throw new Error('Authentication required.')
    }

    if (
      !postExists ||
      (!postExists.published && postExists.userId !== userId)
    ) {
      throw new Error('Post not found')
    }

    const alreadyLiked = await context.prisma.like.findUnique({
      where: { userId_postId: { postId, userId } },
    })

    if (alreadyLiked) {
      if (alreadyLiked.active) {
        const unlike = await context.prisma.like.update({
          where: { userId_postId: { postId, userId } },
          data: { active: false },
        })

        return unlike
      } else {
        const like = await context.prisma.like.update({
          where: { userId_postId: { postId, userId } },
          data: { active: true },
        })

        return like
      }
    }

    const like = await context.prisma.like.create({
      data: { active: true, postId, userId },
    })

    // Send notification to post author

    if (postExists.userId === userId) return like // self like, no notification

    await context.prisma.likeNotification.create({
      data: {
        userId: postExists.userId,
        message: `${userExists.name} liked your post.`,
        createdAt: new Date(),
        likeAuthorId: userId,
        postId,
      },
    })

    return like
  },
})
