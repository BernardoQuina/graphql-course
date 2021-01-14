import { queryType } from 'nexus'

export const Query = queryType({
  definition(t) {
    t.crud.user()
    t.crud.users({ pagination: true, ordering: true, filtering: true })

    t.crud.book()
    t.crud.books({ pagination: true, ordering: true, filtering: true })

    t.crud.review()
    t.crud.reviews({ pagination: true, ordering: true, filtering: true })

    t.field('userCount', {
      type: 'Int',
      resolve(_root,  _, { prisma }) {

        return prisma.user.count({})
      },
    })

    t.field('bookCount', {
      type: 'Int',
      resolve(_root,  _, { prisma }) {

        return prisma.book.count({})
      },
    })

    t.field('reviewCount', {
      type: 'Int',
      resolve(_root,  _, { prisma }) {

        return prisma.review.count({})
      },
    })
  },
})