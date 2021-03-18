import { mutationField, nonNull, stringArg } from 'nexus'
import { isAuth } from '../../util/isAuth'

export const likePost = mutationField('likePost', {
  type: 'Like',
  args: {
    postId: nonNull(stringArg()),
  },
  async resolve(_root, { postId }, { prisma, req }) {
    const postExists = await prisma.post.findUnique({ where: { id: postId } })

    const userId = isAuth(req) as string // It will throw an error otherwise

    if (
      !postExists ||
      (!postExists.published && postExists.userId !== userId)
    ) {
      throw new Error('Post not found')
    }

    const alreadyLiked = await prisma.like.findUnique({
      where: { userId_postId: { postId, userId } },
    })

    if (alreadyLiked) {
      if (alreadyLiked.active) {
        const unlike = await prisma.like.update({
          where: { userId_postId: { postId, userId } },
          data: { active: false },
        })

        return unlike
      } else {
        const like = await prisma.like.update({
          where: { userId_postId: { postId, userId } },
          data: { active: true },
        })

        return like
      }
    }

    const like = await prisma.like.create({
      data: { active: true, postId, userId },
    })

    return like
  },
})
