import { list, mutationField, nonNull, stringArg } from 'nexus'

export const markAsRead = mutationField('markAsRead', {
  type: 'Boolean',
  args: {
    notificationsIds: nonNull(list(nonNull(stringArg()))),
  },
  async resolve(_root, { notificationsIds }, context) {

    let error = false

    notificationsIds.forEach(async (id) => {
      const notificationExists = await context.prisma.notification.findUnique(
        { where: { id } }
      )
      if (!notificationExists) {
        error = true
      }

      const updated = await context.prisma.notification.update({
        where: { id },
        data: { seen: true },
      })
      if (!updated) error = true
    })

    if (error) {
      throw new Error('Could not update notification')
    }

    return true
  },
})
