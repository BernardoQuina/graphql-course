import { objectType } from 'nexus'

export const Review = objectType({
  name: 'Review',
  definition(t) {
    t.model.id()
    t.model.rating()
    t.model.text()
    t.model.author()
    t.model.userId()
    t.model.book()
    t.model.bookId()
  },
})