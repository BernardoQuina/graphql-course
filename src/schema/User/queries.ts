import { queryField } from 'nexus'
import { isAuth } from '../../util/isAuth'

export const userQueries = queryField((t) => {
  t.crud.user({
    async resolve(_root, args, ctx, info, originalResolver) {
      if (args.where.email) {
        throw new Error('Cannot query by email.')
      }
      const res = await originalResolver(_root, args, ctx, info)
      return res
    },
  })

  t.crud.users({ pagination: true, filtering: true, ordering: true })

  t.field('userCount', {
    type: 'Int',
    resolve(_root, _, { prisma }) {
      return prisma.user.count({})
    },
  })

  t.field('me', {
    type: 'User',
    resolve(_root, _args, context) {
      const userId = isAuth(context, false)

      if (!context.req.user && !context.req.session.userId) return null

      return context.prisma.user.findUnique({ where: { id: userId } })
    },
  })
})
