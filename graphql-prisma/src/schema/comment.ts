import {
  mutationField,
  nonNull,
  objectType,
  stringArg,
} from 'nexus'

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

export const createComment = mutationField('createComment', {
  type: Comment,
  args: {
    userId: nonNull(stringArg()),
    postId: nonNull(stringArg()),
    text: nonNull(stringArg()),
  },
  async resolve(_root, { userId, postId, text }, { prisma }) {
    const userExists = await prisma.user.findUnique({ where: { id: userId } })

    if (!userExists) {
      throw new Error('User not found')
    }

    const postExists = await prisma.post.findUnique({ where: { id: postId } })

    if (!postExists) {
      throw new Error('Post not found')
    }

    return prisma.comment.create({
      data: {
        text,
        author: { connect: { id: userId } },
        post: { connect: { id: postId } },
      },
    })
  },
})

export const updateComment = mutationField('updateComment', {
  type: Comment,
  args: {
    whereId: nonNull(stringArg()),
    updateText: nonNull(stringArg()),
  },
  async resolve(_root, { whereId, updateText }, { prisma }) {
    const commentExists = await prisma.comment.findUnique({
      where: { id: whereId },
    })

    if (!commentExists) {
      throw new Error('Comment not found')
    }

    return prisma.comment.update({
      where: { id: whereId },
      data: { text: updateText },
    })
  },
})

export const deleteComment = mutationField('deleteComment', {
  type: Comment,
  args: {
    id: nonNull(stringArg())
  },
  async resolve(_root, { id }, { prisma }) {
    const commentExists = await prisma.comment.findUnique({ where: { id } })

    if (!commentExists) {
      throw new Error('Comment not found')
    }

    return prisma.comment.delete({ where: { id } })
  }
})
