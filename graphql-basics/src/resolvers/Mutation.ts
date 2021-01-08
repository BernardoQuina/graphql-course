import { v4 as uuidv4 } from 'uuid'

import { ServerContext } from '../typescript-types/ServerContext'
import { Post } from '../typescript-types/Post'
import { User } from '../typescript-types/User'
import { Comment } from '../typescript-types/Comment'

export const Mutation = {
  createUser(parent: any, args: any, { db }: ServerContext, info: any) {
    const emailTaken = db.users.some((user) => user.email === args.data.email)

    if (emailTaken) {
      throw new Error('Email already taken')
    }

    const user: User = {
      id: uuidv4(),
      posts: [],
      comments: [],
      ...args.data,
    }

    db.users.push(user)

    return user
  },
  updateUser(parent: any, args: any, { db }: ServerContext, info: any) {
    const user = db.users.find((user) => user.id === args.id)

    if (!user) {
      throw new Error('User not found')
    }

    if (typeof args.data.email === 'string') {
      const emailTaken = db.users.some((user) => user.email === args.data.email)

      if (emailTaken) {
        throw new Error('Email taken')
      }

      user.email = args.data.email
    }

    if (typeof args.data.name === 'string') {
      user.name = args.data.name
    }

    if (typeof args.data.age !== 'undefined') {
      user.age = args.data.age
    }

    return user
  },
  deleteUser(parent: any, args: any, { db }: ServerContext, info: any) {
    const userIndex = db.users.findIndex((user) => user.id === args.id)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    const deletedUser = db.users.splice(userIndex, 1) // returns an array

    db.posts = db.posts.filter((post) => {
      const match = post.author === args.id

      if (match) {
        db.comments = db.comments.filter((comment) => comment.post !== post.id)
      }

      return !match
    })

    db.comments = db.comments.filter((comment) => comment.author !== args.id)

    return deletedUser[0]
  },
  createPost(parent: any, args: any, { db, pubSub }: ServerContext, info: any) {
    const userExists = db.users.some((user) => user.id === args.data.author)

    if (!userExists) {
      throw new Error('User not found')
    }

    const post: Post = {
      id: uuidv4(),
      comments: [],
      ...args.data,
    }

    db.posts.push(post)

    if (post.published) {
      pubSub.publish('post', { post: { mutation: 'CREATED', data: post } })
    }

    return post
  },
  updatePost(parent: any, args: any, { db, pubSub }: ServerContext, info: any) {
    const post = db.posts.find((post) => post.id === args.id)
    const originalPost = { ...post }

    if (!post) {
      throw new Error('Post not found')
    }

    if (typeof args.data.title === 'string') {
      post.title = args.data.title
    }

    if (typeof args.data.body === 'string') {
      post.body = args.data.body
    }

    if (typeof args.data.published === 'boolean') {
      post.published = args.data.published

      if (originalPost.published && !post.published) {
        pubSub.publish('post', {
          post: { mutation: 'DELETED', data: originalPost },
        })
      } else if (!originalPost.published && post.published) {
        pubSub.publish('post', { post: { mutation: 'CREATED', data: post } })
      }
    } else if (post.published) {
      pubSub.publish('post', { post: { mutation: 'UPDATED', data: post } })
    }

    return post
  },
  deletePost(parent: any, args: any, { db, pubSub }: ServerContext, info: any) {
    const postIndex = db.posts.findIndex((post) => post.id === args.id)

    if (postIndex === -1) {
      throw new Error('Post not found')
    }

    const [post] = db.posts.splice(postIndex, 1) // returns an array

    db.comments = db.comments.filter((comment) => comment.post !== args.id)

    if (post.published) {
      pubSub.publish('post', {
        post: { mutation: 'DELETED', data: post },
      })
    }

    return post
  },
  createComment(
    parent: any,
    args: any,
    { db, pubSub }: ServerContext,
    info: any
  ) {
    const userExists = db.users.some((user) => user.id === args.data.author)
    const postExistsAndPublished = db.posts.some((post) => {
      return post.id === args.data.post && post.published
    })

    if (!userExists) {
      throw new Error('User not found')
    }

    if (!postExistsAndPublished) {
      throw new Error('Post not found')
    }

    const comment: Comment = {
      id: uuidv4(),
      ...args.data,
    }

    db.comments.push(comment)
    pubSub.publish(`comment ${args.data.post}`, { comment })

    return comment
  },
  updateComment(parent: any, args: any, { db }: ServerContext, info: any) {
    const comment = db.comments.find((comment) => comment.id === args.id)

    if (!comment) {
      throw new Error('Comment not found')
    }

    if (typeof args.data.text === 'string') {
      comment.text = args.data.text
    }

    return comment
  },
  deleteComment(parent: any, args: any, { db }: ServerContext, info: any) {
    const commentIndex = db.comments.findIndex(
      (comment) => comment.id === args.id
    )

    if (commentIndex === -1) {
      throw new Error('Comment not found')
    }

    const deletedComment = db.comments.splice(commentIndex, 1)

    return deletedComment[0]
  },
}
