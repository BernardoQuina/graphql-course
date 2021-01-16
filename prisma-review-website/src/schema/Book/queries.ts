import { queryField } from 'nexus';

export const bookQueries = queryField((t) => {
  t.crud.book()
  t.crud.books({ pagination: true, ordering: true, filtering: true })
  t.field('bookCount', {
    type: 'Int',
    resolve(_root,  _, { prisma }) {

      return prisma.book.count({})
    },
  })
})