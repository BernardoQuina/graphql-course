import { v4 as uuidv4 } from 'uuid'

import { DbContext } from '../db'
import { Post } from '../typescript-types/Post'
import { User } from '../typescript-types/User'
import { Comment } from '../typescript-types/Comment'

export const Mutation = {
  createUser(parent: any, args: any, { db }: DbContext, info: any) {
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
  updateUser(parent: any, args: any, { db }: DbContext, info: any) {
    const user = db.users.find(user => user.id === args.id)

    if (!user) {
      throw new Error('User not found!')
    }

    if (typeof args.data.email === 'string') {
      const emailTaken = db.users.some(user => user.email === args.data.email)

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
  deleteUser(parent: any, args: any, { db }: DbContext, info: any) {
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
  createPost(parent: any, args: any, { db }: DbContext, info: any) {
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

    return post
  },
  deletePost(parent: any, args: any, { db }: DbContext, info: any) {
    const postIndex = db.posts.findIndex((post) => post.id === args.id)

    if (postIndex === -1) {
      throw new Error('Post not found')
    }

    const deletedPost = db.posts.splice(postIndex, 1) // returns an array

    db.comments = db.comments.filter((comment) => comment.post !== args.id)

    return deletedPost[0]
  },
  createComment(parent: any, args: any, { db }: DbContext, info: any) {
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

    return comment
  },
  deleteComment(parent: any, args: any, { db }: DbContext, info: any) {
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
