import { queryField } from 'nexus'

export const commentQueries = queryField((t) => {
  t.crud.comment()
  t.crud.comments({ pagination: true, filtering: true, ordering: true })
  t.field('commentCount', {
    type: 'Int',
    resolve(_root, _, { prisma }) {
      return prisma.comment.count({})
    },
  })
})
