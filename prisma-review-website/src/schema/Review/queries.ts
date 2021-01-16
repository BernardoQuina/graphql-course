import { queryField } from 'nexus';

export const reviewQueries = queryField((t) => {
  t.crud.review()
  t.crud.reviews({ pagination: true, ordering: true, filtering: true })
  t.field('reviewCount', {
    type: 'Int',
    resolve(_root,  _, { prisma }) {

      return prisma.review.count({})
    },
  })
})