import { list, queryField } from 'nexus'
import { isAuth } from '../../util/isAuth'

export const likeNotificationQueries = queryField((t) => {
  t.crud.likeNotification()
  t.crud.likeNotifications({
    pagination: true,
    filtering: true,
    ordering: true,
  })

  t.field('myLikeNotifications', {
    type: list('LikeNotification'),
    resolve(_root, _args, context) {
      const userId = isAuth(context, false)

      if (!context.req.user && !context.req.session.userId) return null

      return context.prisma.likeNotification.findMany({ where: { userId } })
    },
  })
})
