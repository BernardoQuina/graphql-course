import { objectType } from 'nexus'

export const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.title()
    t.model.body()
    t.model.images()
    t.model.published()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.author()
    t.model.userId()
    t.model.comments()
    t.model.likes()

    t.field('textSnippet', {
      type: 'String',
      resolve(root, _args, _ctx) {
        if (root.body!.length < 30) {
          const snippet = root.body?.slice(0, 30) as string

          return snippet
        }

        const snippet = (root.body?.slice(0, 30) as string) + '...'

        return snippet
      },
    })

    t.field('commentCount', {
      type: 'Int',
      async resolve(root, _args, { prisma }) {
        const commentCount = await prisma.comment.count({
          where: { postId: root.id! },
        })

        return commentCount
      },
    })

    t.field('likeCount', {
      type: 'Int',
      async resolve(root, _args, { prisma }) {
        const likeCount = await prisma.like.count({
          where: { postId: root.id!, active: { equals: true } },
        })

        return likeCount
      },
    })
  },
})
