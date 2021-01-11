import {
  booleanArg,
  mutationField,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'

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

export const createPost = mutationField('createPost', {
  type: Post,
  args: {
    title: nonNull(stringArg()),
    body: nonNull(stringArg()),
    published: nonNull(booleanArg()),
    userId: nonNull(stringArg()),
  },
  async resolve(_root, { title, body, published, userId }, { prisma }) {
    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
      throw new Error('Invalid credentials. Please login to post')
    }

    return prisma.post.create({
      data: {
        title,
        body,
        published,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    })
  },
})

export const updatePost = mutationField('updatePost', {
  type: Post,
  args: {
    whereId: nonNull(stringArg()),
    updateTitle: nonNull(stringArg()),
    updateBody: nonNull(stringArg()),
    updatePublished: nonNull(booleanArg()),
  },
  async resolve(
    _root,
    { whereId, updateTitle, updateBody, updatePublished },
    { prisma }
  ) {
    const postExists = await prisma.post.findUnique({ where: { id: whereId } })

    if (!postExists) {
      throw new Error('The post you are trying to update does not exist')
    }

    let data: { title?: string; body?: string; published?: boolean } = {}

    if (updateTitle) {
      data.title = updateTitle
    }

    if (updateBody) {
      data.body = updateBody
    }

    if (updatePublished) {
      data.published = updatePublished
    }

    if (!updateTitle && !updateBody && !updatePublished) {
      throw new Error('Please provide something to update')
    }

    return prisma.post.update({ where: { id: whereId }, data })
  },
})

export const deletePost = mutationField('deletePost', {
  type: Post,
  args: {
    id: nonNull(stringArg()),
  },
  async resolve(_root, { id }, { prisma }) {
    const postExists = await prisma.post.findUnique({ where: { id } })

    if (!postExists) {
      throw new Error('Post not found')
    }

    await prisma.comment.deleteMany({where: {postId: id}})

    return prisma.post.delete({ where: { id } })
  },
})
