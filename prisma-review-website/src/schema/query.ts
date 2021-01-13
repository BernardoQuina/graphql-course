import { queryType } from 'nexus'

export const Query = queryType({
  definition(t) {
    t.crud.user()
    t.crud.users({pagination: true, ordering: true, filtering: true})
  }
})