
import { GraphQLServer } from 'graphql-yoga'
import { v4 as uuidv4 } from 'uuid'

// Typescript types
import { Post } from './typescript-types/Post'
import { User } from './typescript-types/User'
import { Comment } from './typescript-types/Comment'


// Demo data
let users: User[] = [
  {
    id: '1',
    name: 'Bernardo',
    email: 'bernardo@example.com',
    age: 24,
    posts: ['1', '2'],
    comments: ['3']
  },
  {
    id: '2',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27,
    posts: ['3'],
    comments: ['2']
  },
  {
    id: '3',
    name: 'Sarah',
    email: 'sarah@example.com',
    posts: [],
    comments: ['1']
  },
  {
    id: '4',
    name: 'Mike',
    email: 'mike@example.com',
    posts: [],
    comments: ['4']
  },
]

let posts: Post[] = [
  {
    id: '1',
    title: 'The first post',
    body: 'This is the body of the first post',
    published: true,
    author: '1',
    comments: ['4', '3']
  },
  {
    id: '2',
    title: 'The second post is not published',
    body: 'This text is not readable by users because it is not published',
    published: false,
    author: '1',
    comments: ['2']
  },
  {
    id: '3',
    title: 'GraphQL course',
    body: 'I am taking the GraphQL course by Andrew Mead on Udemy',
    published: true,
    author: '2',
    comments: ['1']
  },
]

let comments: Comment[] = [
  {
    id: '1',
    text: 'This post is trash',
    author: '3',
    post: '3'
  },
  {
    id: '2',
    text: 'I do not find this useful at all',
    author: '2',
    post: '2'
  },
  {
    id: '3',
    text: 'I think this is great!',
    author: '1',
    post: '1'
  },
  {
    id: '4',
    text: 'Just wow!',
    author: '4',
    post: '1'
  }
]
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
    createUser(data: CreateUserInput): User!
    deleteUser(id: ID!): User!
    createPost(data: CreatePostInput): Post!
    deletePost(id: ID!): Post!
    createComment(data: CreateCommentInput): Comment!
    deleteComment(id: ID!): Comment!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
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
    },
  },
  Mutation: {
    createUser(parent: any, args: any, ctx: any, info: any) {
      const emailTaken = users.some((user) => user.email === args.data.email)

      if (emailTaken) {
        throw new Error('Email already taken')
      }

      const user: User = {
        id: uuidv4(),
        posts: [],
        comments: [],
        ...args.data,
      }

      users.push(user)

      return user
    },
    deleteUser(parent: any, args: any, ctx: any, info: any) {
      const userIndex = users.findIndex((user) => user.id === args.id)

      if (userIndex === -1) {
        throw new Error('User not found')
      }

      const deletedUser = users.splice(userIndex, 1) // returns an array


      posts = posts.filter((post) => {
        const match = post.author === args.id

        if (match) {
          comments = comments.filter(comment => comment.post !== post.id)
        }

        return !match
      })

      comments = comments.filter(comment => comment.author !== args.id)

      

      return deletedUser[0]
    },
    createPost(parent: any, args: any, ctx: any, info: any) {
      const userExists = users.some((user) => user.id === args.data.author)

      if (!userExists) {
        throw new Error('User not found')
      }

      const post: Post = {
        id: uuidv4(),
        comments: [],
        ...args.data,
      }

      posts.push(post)

      return post
    },
    deletePost(parent: any, args: any, ctx: any, info: any) {
      const postIndex = posts.findIndex((post) => post.id === args.id)

      if (postIndex === -1) {
        throw new Error('Post not found')
      }

      const deletedPost = posts.splice(postIndex, 1) // returns an array

      comments = comments.filter(comment => comment.post !== args.id)

      return deletedPost[0]
    },
    createComment(parent: any, args: any, ctx: any, info: any) {
      const userExists = users.some((user) => user.id === args.data.author)
      const postExistsAndPublished = posts.some((post) => {
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

      comments.push(comment)

      return comment
    },
    deleteComment(parent: any, args: any, ctx: any, info: any) {
      const commentIndex = comments.findIndex(comment => comment.id === args.id)

      if (commentIndex === -1) {
        throw new Error('Comment not found')
      }

      const deletedComment = comments.splice(commentIndex, 1)

      return deletedComment[0]
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
    },
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
    },
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
    },
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => {
  console.log('The server is up!')
})
