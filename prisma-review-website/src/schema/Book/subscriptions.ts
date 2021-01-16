import { objectType, enumType, subscriptionField, nonNull, idArg } from 'nexus'

export const SubscriptionResponse = objectType({
  name: 'SubscriptionResponse',
  definition(t) {
    t.field('Mutation', {
      type: enumType({
        name: 'MutationEnum',
        members: ['CREATED', 'UPDATED', 'DELETED'],
      }),
    }),
      t.field('data', {
        type: 'Book',
      })
  },
})

export const subscribeToBookChanges = subscriptionField(
  'subscribeToBookChanges',
  {
    type: 'Book',
    args: {
      bookId: nonNull(idArg()),
    },
    async subscribe(_root, { bookId }, { prisma, pubsub }) {
      const bookExists = await prisma.book.findUnique({ where: { id: bookId } })

      if (!bookExists) {
        throw new Error('Book not found')
      }

      return pubsub.asyncIterator(`book ${bookId}`)
    },
    resolve(_, { bookId }, { prisma }) {
      return prisma.book.findUnique({ where: { id: bookId } })
    },
  }
)
