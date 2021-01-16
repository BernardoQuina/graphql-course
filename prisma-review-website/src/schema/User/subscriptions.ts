import { objectType } from 'nexus'

export const userSubResponse = objectType({
  name: 'userSubResponse',
  definition(t) {
    t.field('mutation', {
      type: 'String',
    }),
      t.field('data', {
        type: 'User',
      })
  },
})