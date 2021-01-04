import { GraphQLServer } from 'graphql-yoga'

// Typescript type for users
type User = {
  id: string
  name: string
  email: string
  age?: number
  posts: string[]
  comments: string[]
}

// Typescript type for posts
type Post = {
  id: string
  title: string
  body: string
  published: boolean
  author: string
  comments: string[]
}

// Typescript type for comments
type Comment = {
  id: string
  text: string
  author: string
  post: string
}

// Demo post data
const posts: Post[] = [
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

// Demo user data
const users: User[] = [
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

// Demo comment data
const comments: Comment[] = [
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
