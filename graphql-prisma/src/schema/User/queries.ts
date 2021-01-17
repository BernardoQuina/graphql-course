import { queryField } from 'nexus';

export const userQueries = queryField((t) => {
  t.crud.user()
  t.crud.users({ pagination: true, filtering: true, ordering: true })
  t.field('userCount', {
    type: 'Int',
    resolve(_root, _, {prisma}) {
      return prisma.user.count({})
    }
  })
})