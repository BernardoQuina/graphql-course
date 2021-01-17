import { objectType } from 'nexus'

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.body()
    t.model.published()
    t.model.author()
    t.model.userId()
    t.model.comments()
  },
})