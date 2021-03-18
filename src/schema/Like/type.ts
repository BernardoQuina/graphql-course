import { objectType } from 'nexus'

export const Like = objectType({
  name: 'Like',
  definition(t) {
    t.model.active()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.author()
    t.model.userId()
    t.model.post()
    t.model.postId()
  },
})