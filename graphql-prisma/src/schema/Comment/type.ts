import { objectType } from 'nexus'

export const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.model.id()
    t.model.text()
    t.model.author()
    t.model.userId()
    t.model.post()
    t.model.postId()
  },
})