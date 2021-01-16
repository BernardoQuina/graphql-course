import { objectType } from 'nexus'

export const Book = objectType({
  name: 'Book',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.isbn()
    t.model.author()
    t.model.userId()
    t.model.reviews()
  },
})