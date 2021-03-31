import { list, queryField } from 'nexus'
import { isAuth } from '../../util/isAuth'

export const NotificationQueries = queryField((t) => {
  t.crud.notification()
  t.crud.notifications({
    pagination: true,
    filtering: true,
    ordering: true,
  })

  t.field('myNotifications', {
    type: list('Notification'),
    resolve(_root, _args, context) {
      const userId = isAuth(context, false)

      if (!context.req.user && !context.req.session.userId) return null

      return context.prisma.notification.findMany({
        where: { receiverId: userId },
        orderBy: { createdAt: 'desc' },
      })
    },
  })
})
