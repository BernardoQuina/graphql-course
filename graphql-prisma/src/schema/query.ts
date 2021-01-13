import { queryType } from 'nexus'

export const Query = queryType({
  definition(t) {
    t.crud.user()
    t.crud.users({ pagination: true, filtering: true, ordering: true })
    t.crud.post()
    t.crud.posts({ pagination: true, filtering: true, ordering: true })
    t.crud.comment()
    t.crud.comments({ pagination: true, filtering: true, ordering: true })
  },
})