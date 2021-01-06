import { GraphQLServer } from 'graphql-yoga'
import { v4 as uuidv4 } from 'uuid'
import db, { DbContext } from './db'


// Typescript types
import { Post } from './typescript-types/Post'
import { User } from './typescript-types/User'
import { Comment } from './typescript-types/Comment'


// Resolvers
const resolvers = {
  Query: {
    users(parent: any, args: { query: string }, { db }: DbContext, info: any) {
      if (!args.query) {
        return db.users
      }

      return db.users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    posts(parent: any, args: { query: string }, { db }: DbContext, info: any) {
      if (!args.query) {
        return db.posts
      }

      return db.posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        )
      })
    },
    comments(parent: any, args: any, { db }: DbContext, info: any) {
      return db.comments
    },
    me() {
      return {
        id: 'abc123',
        name: 'Bernardo',
        email: 'bernardo@example.com',
        age: 24,
      }
    },
    post() {
      return {
        id: '123084',
        title: 'The title',
        body: 'The body',
        published: true,
      }
    },
  },
  Mutation: {
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
  },
  Post: {
    author(parent: Post, args: any, { db }: DbContext, info: any) {
      return db.users.find((user) => {
        return user.id === parent.author
      })
    },
    comments(parent: Post, args: any, { db }: DbContext, info: any) {
      return db.comments.filter((comment) => {
        return comment.post === parent.id
      })
    },
  },
  User: {
    posts(parent: User, args: any, { db }: DbContext, info: any) {
      return db.posts.filter((post) => {
        return post.author === parent.id
      })
    },
    comments(parent: User, args: any, { db }: DbContext, info: any) {
      return db.comments.filter((comment) => {
        return comment.author === parent.id
      })
    },
  },
  Comment: {
    author(parent: Comment, args: any, { db }: DbContext, info: any) {
      return db.users.find((user) => {
        return user.id === parent.author
      })
    },
    post(parent: Comment, args: any, { db }: DbContext, info: any) {
      return db.posts.find((post) => {
        return post.id === parent.post
      })
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db
  }
})

server.start(() => {
  console.log('The server is up!')
})
