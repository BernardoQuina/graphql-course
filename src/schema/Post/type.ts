import { objectType } from 'nexus'

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.body()
    t.model.published()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.author()
    t.model.userId()
    t.model.comments()

    t.field('textSnippet', {type: 'String', resolve(root, _args, _ctx) {
      if (root.body!.length < 30) {
        const snippet = root.body?.slice(0, 30) as string

        return snippet
      }

      const snippet = root.body?.slice(0, 30) as string + '...'
      
      return snippet
    }})
  },
})