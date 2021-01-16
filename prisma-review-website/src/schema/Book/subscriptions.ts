import { Book } from '@prisma/client'
import { objectType, subscriptionField, nonNull, idArg } from 'nexus'

export const bookSubResponse = objectType({
  name: 'bookSubResponse',
  definition(t) {
    t.field('mutation', {
      type: 'String',
    }),
      t.field('data', {
        type: 'Book',
      })
  },
})

export const bookSubByUser = subscriptionField('bookSubByUser', {
  type: 'bookSubResponse',
  args: {
    userId: nonNull(idArg())
  },
  async subscribe(_, { userId }, { prisma, pubsub }) {
    const userExists = await prisma.user.findUnique({where: { id: userId }})
    if (!userExists) {
      throw new Error('User not found.')
    }

    return pubsub.asyncIterator(`book from user ${userId}`)
  },
  resolve(payload: {mutation: string, data: Book}) {
    return payload
  }
})

export const bookSub = subscriptionField('bookSub', {
  type: 'bookSubResponse',
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
  resolve(payload: {mutation: string, data: Book}) {
    return payload
  },
})
