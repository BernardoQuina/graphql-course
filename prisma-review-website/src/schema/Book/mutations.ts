import { mutationField, nonNull, stringArg, idArg } from 'nexus'
import { pubsubPublishMany } from '../../util/pubsubmany'

export const createBook = mutationField('createBook', {
  type: 'Book',
  args: {
    title: nonNull(stringArg()),
    isbn: nonNull(stringArg()),
    userId: nonNull(idArg()),
  },
  async resolve(_root, { title, isbn, userId }, { prisma, pubsub }) {
    const userExistsAndIsVendor = await prisma.user.findFirst({
      where: { id: userId, role: 'VENDOR' },
    })

    if (!userExistsAndIsVendor) {
      throw new Error(
        'User not found or not a vendor. Only vendors can create listings.'
      )
    }

    const createdBook = await prisma.book.create({
      data: { title, isbn, author: { connect: { id: userId } } },
    })

    pubsub.publish(`book from user ${userId}`, {
      mutation: 'CREATED',
      data: createdBook,
    })

    return createdBook
  },
})

export const updateBook = mutationField('updateBook', {
  type: 'Book',
  args: {
    whereId: nonNull(idArg()),
    updateTitle: stringArg(),
    updateIsbn: stringArg(),
  },
  async resolve(
    _root,
    { whereId, updateTitle, updateIsbn },
    { prisma, pubsub }
  ) {
    const bookExists = await prisma.book.findUnique({ where: { id: whereId } })

    if (!bookExists) {
      throw new Error('Book not found')
    }

    let data: { title?: string; isbn?: string } = {}

    if (updateTitle) {
      data.title = updateTitle
    }

    if (updateIsbn) {
      data.isbn = updateIsbn
    }

    if (!updateTitle && !updateIsbn) {
      throw new Error('Please provide something to update')
    }

    const updatedBook = await prisma.book.update({
      where: { id: whereId },
      data,
    })

    pubsubPublishMany(
      [`book ${whereId}`, `book from user ${updatedBook.userId}`],
      pubsub,
      { mutation: 'UPDATED', data: updatedBook }
    )

    return updatedBook
  },
})

export const deleteBook = mutationField('deleteBook', {
  type: 'Book',
  description:
    'WARNING: Do not select author field, it will throw an error. Deletion will eliminate connection to user before the data is returned',
  args: {
    id: nonNull(idArg()),
  },
  async resolve(_root, { id }, { prisma, pubsub }) {
    const bookExists = await prisma.book.findUnique({ where: { id } })

    if (!bookExists) {
      throw new Error('Book not found')
    }

    await prisma.review.deleteMany({ where: { bookId: id } })

    pubsubPublishMany(
      [`book ${id}`, `book from user ${bookExists.userId}`],
      pubsub,
      { mutation: 'DELETED', data: bookExists }
    )

    return prisma.book.delete({ where: { id } })
  },
})
