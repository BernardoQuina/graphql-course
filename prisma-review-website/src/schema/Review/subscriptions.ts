import { Review } from '@prisma/client'
import { idArg, nonNull, objectType, subscriptionField } from 'nexus'

export const reviewSubResponse = objectType({
  name: 'reviewSubResponse',
  definition(t) {
    t.field('mutation', {
      type: 'String',
    }),
      t.field('data', {
        type: 'Review',
      })
  },
})

export const reviewSubByUser = subscriptionField('reviewSubByUser', {
  type: 'reviewSubResponse',
  args: {
    userId: nonNull(idArg()),
  },
  async subscribe(_root, { userId }, { prisma, pubsub }) {
    const userExists = await prisma.user.findUnique({ where: { id: userId } })

    if (!userExists) {
      throw new Error('User not found.')
    }

    return pubsub.asyncIterator(`review from user ${userId}`)
  },
  resolve(payload: { mutation: string; data: Review }) {
    return payload
  },
})

export const reviewSubByBook = subscriptionField('reviewSubByBook', {
  type: 'reviewSubResponse',
  args: {
    bookId: nonNull(idArg()),
  },
  async subscribe(_, { bookId }, { prisma, pubsub }) {
    const bookExists = await prisma.book.findUnique({ where: { id: bookId } })

    if (!bookExists) {
      throw new Error('Book not found.')
    }

    return pubsub.asyncIterator(`review from book ${bookId}`)
  },
  resolve(payload: { mutation: string; data: Review }) {
    return payload
  },
})

export const reviewSub = subscriptionField('reviewSub', {
  type: 'reviewSubResponse',
  args: {
    reviewId: nonNull(idArg()),
  },
  async subscribe(_root, { reviewId }, { prisma, pubsub }) {
    const reviewExists = await prisma.review.findUnique({
      where: { id: reviewId },
    })

    if (!reviewExists) {
      throw new Error('Review not found.')
    }

    return pubsub.asyncIterator(`review ${reviewId}`)
  },
  resolve(payload: { mutation: string; data: Review }) {
    return payload
  },
})
