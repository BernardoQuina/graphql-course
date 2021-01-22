import { mutationField, nonNull, stringArg, booleanArg } from 'nexus'
import { pubsubPublishMany } from '../../util/pubsubMany'
import { getUserId } from '../../util/getUserId'

export const createPost = mutationField('createPost', {
  type: 'Post',
  args: {
    title: nonNull(stringArg()),
    body: nonNull(stringArg()),
    published: nonNull(booleanArg()),
  },
  async resolve(
    _root,
    { title, body, published },
    { prisma, pubsub, request }
  ) {
    const userId = getUserId(request)

    const createdPost = await prisma.post.create({
      data: {
        title,
        body,
        published,
        updatedAt: new Date(),
        author: {
          connect: {
            id: userId,
          },
        },
      },
    })

    pubsub.publish(`post from user ${userId}`, {
      mutation: 'CREATED',
      data: createdPost,
    })

    return createdPost
  },
})

export const updatePost = mutationField('updatePost', {
  type: 'Post',
  args: {
    whereId: nonNull(stringArg()),
    updateTitle: stringArg(),
    updateBody: stringArg(),
    updatePublished: booleanArg(),
  },
  async resolve(
    _root,
    { whereId, updateTitle, updateBody, updatePublished },
    { prisma, pubsub, request }
  ) {
    const userId = getUserId(request)

    const postExists = await prisma.post.findUnique({ where: { id: whereId } })

    if (!postExists) {
      throw new Error('The post you are trying to update does not exist')
    }

    if (userId !== postExists.userId) {
      throw new Error('Invalid credentials.')
    }

    let data: { title?: string; body?: string; published?: boolean } = {}

    if (updateTitle) {
      data.title = updateTitle
    }

    if (updateBody) {
      data.body = updateBody
    }

    if (updatePublished !== postExists.published && updatePublished !== null) {
      data.published = updatePublished
    }

    if (!updateTitle && !updateBody && updatePublished === null) {
      throw new Error('Please provide something to update')
    }

    if (data.published === false) {
      await prisma.comment.deleteMany({ where: { postId: whereId } })
    }

    const updatedPost = await prisma.post.update({
      where: { id: whereId },
      data,
    })

    pubsubPublishMany(
      pubsub,
      [`post ${whereId}`, `post from user ${updatedPost.userId}`],
      { mutation: 'UPDATED', data: updatedPost }
    )

    return updatedPost
  },
})

export const deletePost = mutationField('deletePost', {
  type: 'Post',
  args: {
    id: nonNull(stringArg()),
  },
  async resolve(_root, { id }, { prisma, pubsub, request }) {
    const userId = getUserId(request)

    const postExists = await prisma.post.findUnique({ where: { id } })

    if (!postExists) {
      throw new Error('Post not found')
    }

    if (userId !== postExists.userId) {
      throw new Error('Invalid credentials.')
    }

    await prisma.comment.deleteMany({ where: { postId: id } })

    pubsubPublishMany(
      pubsub,
      [`post ${id}`, `post from user ${postExists.userId}`],
      { mutation: 'DELETED', data: postExists }
    )

    return prisma.post.delete({ where: { id } })
  },
})
