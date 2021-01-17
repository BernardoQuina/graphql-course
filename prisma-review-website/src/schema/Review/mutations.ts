import { mutationField, nonNull, idArg, intArg, stringArg } from 'nexus'
import { pubsubPublishMany } from '../../util/pubsubMany'

export const createReview = mutationField('createReview', {
  type: 'Review',
  args: {
    userId: nonNull(idArg()),
    bookId: nonNull(idArg()),
    rating: nonNull(intArg()),
    text: stringArg(),
  },
  async resolve(_root, { userId, bookId, rating, text }, { prisma, pubsub }) {
    const userExistsAndIsConsumer = await prisma.user.findFirst({
      where: { id: userId, role: 'CONSUMER' },
    })

    if (!userExistsAndIsConsumer) {
      throw new Error(
        'User not found or not a consumer. Only consumers can leave reviews.'
      )
    }

    const bookExists = await prisma.book.findUnique({ where: { id: bookId } })

    if (!bookExists) {
      throw new Error('Book not found.')
    }

    const alreadyReviewed = await prisma.review.findFirst({
      where: { userId, bookId },
    })

    if (alreadyReviewed) {
      throw new Error('You can only review each book once.')
    }

    if (rating > 5 || rating < 1) {
      throw new Error('Rating must be from 1 to 5.')
    }

    const createdReview = await prisma.review.create({
      data: {
        rating,
        text,
        author: { connect: { id: userId } },
        book: { connect: { id: bookId } },
      },
    })

    pubsubPublishMany(
      [`review from user ${userId}`, `review from book ${bookId}`],
      pubsub,
      { mutation: 'CREATED', data: createdReview }
    )

    return createdReview
  },
})

export const updateReview = mutationField('updateReview', {
  type: 'Review',
  args: {
    whereId: nonNull(idArg()),
    updateRating: intArg(),
    updateText: stringArg(),
  },
  async resolve(
    _root,
    { whereId, updateRating, updateText },
    { prisma, pubsub }
  ) {
    const reviewExists = await prisma.review.findUnique({
      where: { id: whereId },
    })

    if (!reviewExists) {
      throw new Error('Review not found.')
    }

    let data: { rating?: number; text?: string } = {}

    if (updateRating) {
      data.rating = updateRating
    }

    if (updateText) {
      data.text = updateText
    }

    if (!updateRating && !updateText) {
      throw new Error('Please provide something to update.')
    }

    const updatedReview = await prisma.review.update({
      where: { id: whereId },
      data,
    })

    pubsubPublishMany(
      [
        `review ${whereId}`,
        `review from book ${updatedReview.bookId}`,
        `review from user ${updatedReview.userId}`,
      ],
      pubsub,
      { mutation: 'UPDATED', data: updatedReview }
    )

    return updatedReview
  },
})

export const deleteReview = mutationField('deleteReview', {
  type: 'Review',
  args: {
    id: nonNull(idArg()),
  },
  async resolve(_root, { id }, { prisma, pubsub }) {
    const reviewExists = await prisma.review.findUnique({ where: { id } })

    if (!reviewExists) {
      throw new Error('Review not found.')
    }

    pubsubPublishMany(
      [
        `review ${id}`,
        `review from user ${reviewExists.userId}`,
        `review from book ${reviewExists.bookId}`,
      ],
      pubsub,
      { mutation: 'DELETED', data: reviewExists }
    )

    return prisma.review.delete({ where: { id } })
  },
})
