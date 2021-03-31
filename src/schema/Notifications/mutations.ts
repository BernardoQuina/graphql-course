import { list, mutationField, nonNull, stringArg } from 'nexus'

export const markAsSeen = mutationField('markAsSeen', {
  type: 'Boolean',
  args: {
    notificationsIds: nonNull(list(nonNull(stringArg()))),
  },
  async resolve(_root, { notificationsIds }, context) {
    notificationsIds.forEach(async (id) => {
      const notificationExists = await context.prisma.notification.findUnique({
        where: { id },
      })
      if (!notificationExists) {
        return
      }

      await context.prisma.notification.update({
        where: { id },
        data: { seen: true },
      })
    })

    return true
  },
})

export const markAsRead = mutationField('markAsRead', {
  type: 'Notification',
  args: {
    notificationId: nonNull(stringArg()),
  },
  async resolve(_root, { notificationId }, context) {
      const notificationExists = await context.prisma.notification.findUnique({
        where: { id: notificationId },
      })
      if (!notificationExists) {
        throw new Error('Notification not found.')
      }

      await context.prisma.notification.update({
        where: { id: notificationId },
        data: { read: true },
      })

    return notificationExists
  },
})
