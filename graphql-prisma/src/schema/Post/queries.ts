import { Post } from '@prisma/client'
import { intArg, list, nonNull, queryField } from 'nexus'
import { getUserId } from '../../util/getUserId'

export const postQueries = queryField((t) => {
  t.crud.post({
    async resolve(_root, { where: { id } }, { prisma, req }, _info) {
      const userId = getUserId(req, false)

      if (!id) {
        throw new Error('Please provide a post id.')
      }

      const postExists = await prisma.post.findUnique({ where: { id } })

      if (!postExists) {
        throw new Error('Post not found.')
      }

      if (userId !== postExists.userId && !postExists.published) {
        throw new Error('Invalid credentials.')
      }

      return postExists
    },
  })

  t.crud.posts({
    pagination: true,
    filtering: true,
    ordering: true,
    async resolve(_root, _args, ctx, _info, originalResolver) {
      const posts = await (<Post[]>originalResolver(_root, _args, ctx, _info))

      const userId = getUserId(ctx.req, false)

      const filteredPosts = posts.filter((post) => {
        return post.userId === userId || post.published
      })

      if (filteredPosts.length === 0) {
        throw new Error('Could not find any posts.')
      }

      return filteredPosts
    },
  })

  t.field('postCount', {
    type: 'Int',
    resolve(_root, _, { prisma }) {
      return prisma.post.count({})
    },
  })

  t.field('myPosts', {
    type: nonNull(list('Post')),
    args: {
      take: nonNull(intArg()),
      skip: nonNull(intArg()),
    },
    async resolve(_root, { take, skip }, { prisma, req }) {
      const userId = getUserId(req, true)

      const myPosts = await prisma.post.findMany({
        where: { userId },
        take,
        skip,
        orderBy: { createdAt: 'desc' },
      })

      if (myPosts.length === 0) {
        throw new Error('Could not find any posts.')
      }

      return myPosts
    },
  })
})
