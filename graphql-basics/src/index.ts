import { GraphQLServer } from 'graphql-yoga'
import { v4 as uuidv4 } from 'uuid'

// Demo data
import { comments } from './demo-data/comments'
import { posts } from './demo-data/posts'
import { users } from './demo-data/users'

// Typescript types
import { Post } from './typescript-types/Post'
import { User } from './typescript-types/User'
import { Comment } from './typescript-types/Comment'




// Type definitions (Schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`

// Resolvers
const resolvers = {
  Query: {
    users(parent: any, args: { query: string }, ctx: any, info: any) {
      if (!args.query) {
        return users
      }

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    posts(parent: any, args: { query: string }, ctx: any, info: any) {
      if (!args.query) {
        return posts
      }

      return posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        )
      })
    },
    comments(parent: any, args: any, ctx: any, info: any) {
      return comments
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
    }
  },
  Mutation: {
    createUser(parent: any, args: any, ctx: any, info: any) {
      console.log(args)
      const emailTaken = users.some((user) => user.email === args.email)

      if (emailTaken) {
        throw new Error('Email already taken')
      }

      const user: User = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.age,
        posts: [],
        comments: []
      }

      users.push(user)

      return user
    }
  },
  Post: {
    author(parent: Post, args: any, ctx: any, info: any) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    comments(parent: Post, args: any, ctx: any, info: any) {
      return comments.filter((comment) => {
        return comment.post === parent.id
      })
    }
  },
  User: {
    posts(parent: User, args: any, ctx: any, info: any) {
      return posts.filter((post) => {
        return post.author === parent.id
      })
    },
    comments(parent: User, args: any, ctx: any, info: any) {
      return comments.filter((comment) => {
        return comment.author === parent.id
      })
    }
  },
  Comment: {
    author(parent: Comment, args: any, ctx: any, info: any) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    post(parent: Comment, args: any, ctx: any, info: any) {
      return posts.find((post) => {
        return post.id === parent.post
      })
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => {
  console.log('The server is up!')
})
