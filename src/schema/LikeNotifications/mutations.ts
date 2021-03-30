import { list, mutationField, nonNull, stringArg } from 'nexus'

export const markAsRead = mutationField('markAsRead', {
  type: 'Boolean',
  args: {
    notificationsIds: nonNull(list(nonNull(stringArg()))),
  },
  async resolve(_root, { notificationsIds }, context) {
    notificationsIds.forEach(async (id) => {
      const notificationExists = await context.prisma.likeNotification.findUnique(
        { where: { id } }
      )
      if (!notificationExists) {
        throw new Error('Could not find notification.')
      }

      const updated = await context.prisma.likeNotification.update({
        where: { id },
        data: { read: true },
      })
      if (!updated) throw new Error('Could not update notification.')
    })

    return true
  },
})
