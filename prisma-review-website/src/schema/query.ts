import { queryType } from 'nexus'

export const Query = queryType({
  definition(t) {
    t.crud.user()
    t.crud.users({pagination: true, ordering: true, filtering: true})

    t.crud.book()
    t.crud.books({pagination: true, ordering: true, filtering: true})
    
    t.crud.review()
    t.crud.reviews({pagination: true, ordering: true, filtering: true})
  }
})