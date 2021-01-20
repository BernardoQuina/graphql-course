import { queryField } from 'nexus';
import { getUserId } from '../../util/getUserId';

export const userQueries = queryField((t) => {
  t.crud.user()

  t.crud.users({ pagination: true, filtering: true, ordering: true })

  t.field('userCount', {
    type: 'Int',
    resolve(_root, _, {prisma}) {
      return prisma.user.count({})
    }
  })

  t.field('me', {
    type: 'User',
    resolve(_root, _args, { prisma, request }) {
      const userId = getUserId(request)

      return prisma.user.findUnique({where: {id: userId}})
    }
  })
})