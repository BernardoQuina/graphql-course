import { queryType } from 'nexus'

export const Query = queryType({
  nonNullDefaults: {
    input: true,
  },
  definition(t) {
    t.crud.user()
    t.crud.users({ pagination: true, filtering: true })
  },
})