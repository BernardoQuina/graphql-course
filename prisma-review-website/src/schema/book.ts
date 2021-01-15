import {
  idArg,
  mutationField,
  nonNull,
  objectType,
  stringArg,
  subscriptionField,
} from 'nexus'

export const Book = objectType({
  name: 'Book',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.isbn()
    t.model.author()
    t.model.userId()
    t.model.reviews()
  },
})

export const createBook = mutationField('createBook', {
  type: Book,
  args: {
    title: nonNull(stringArg()),
    isbn: nonNull(stringArg()),
    userId: nonNull(idArg()),
  },
  async resolve(_root, { title, isbn, userId }, { prisma }) {
    const userExistsAndIsVendor = await prisma.user.findFirst({
      where: { id: userId, role: 'VENDOR' },
    })

    if (!userExistsAndIsVendor) {
      throw new Error(
        'User not found or not a vendor. Only vendors can create listings.'
      )
    }

    return prisma.book.create({
      data: { title, isbn, author: { connect: { id: userId } } },
    })
  },
})

export const updateBook = mutationField('updateBook', {
  type: Book,
  args: {
    whereId: nonNull(idArg()),
    updateTitle: stringArg(),
    updateIsbn: stringArg(),
  },
  async resolve(_root, { whereId, updateTitle, updateIsbn }, { prisma }) {
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

    return prisma.book.update({ where: { id: whereId }, data })
  },
})

export const deleteBook = mutationField('deleteBook', {
  type: Book,
  args: {
    id: nonNull(idArg()),
  },
  async resolve(_root, { id }, { prisma, pubsub }) {
    const bookExists = await prisma.book.findUnique({ where: { id } })

    if (!bookExists) {
      throw new Error('Book not found')
    }

    await prisma.review.deleteMany({ where: { bookId: id } })

    const bookToBeDeleted = {...bookExists}

    pubsub.publish(`book ${id}`, bookExists)

    prisma.book.delete({ where: { id } })

    return bookToBeDeleted
  },
})

export const subscribeToBookChanges = subscriptionField(
  'subscribeToBookChanges',
  {
    type: Book,
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
    resolve(_, {bookId}, {prisma}) {
      return prisma.book.findUnique({where: {id: bookId}})
    }
  }
)
