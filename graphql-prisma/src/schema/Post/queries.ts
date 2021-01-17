import { queryField } from 'nexus';

export const postQueries = queryField((t) => {
  t.crud.post()
  t.crud.posts({ pagination: true, filtering: true, ordering: true })
  t.field('postCount', {
    type: 'Int',
    resolve(_root, _, {prisma}) {
      return prisma.post.count({})
    }
  })
})