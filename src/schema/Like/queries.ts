import { queryField } from 'nexus';

export const likeQueries = queryField((t) => {
  t.crud.like()
  t.crud.likes({ pagination: true, filtering: true, ordering: true })
  t.field('likeCount', {
    type: 'Int',
    resolve(_root, _, {prisma}) {
      return prisma.like.count({})
    }
  })
})