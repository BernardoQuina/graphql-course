import { GraphQLServer } from 'graphql-yoga'

// Typescript type for users
type User = {
  id: string
  name: string
  email: string
  age?: number
}

// Typescript type for posts
type Post = {
  id: string
  title: string
  body: string
  published: boolean
}

// Demo post data
const posts: Post[] = [
  {
    id: '1',
    title: 'The first post',
    body: 'This is the body of the first post',
    published: true,
  },
  {
    id: '2',
    title: 'The second post is not published',
    body: 'This text is not readable by users because it is not published',
    published: false,
  },
  {
    id: '3',
    title: 'GraphQL course',
    body: 'I am taking the GraphQL course by Andrew Mead on Udemy',
    published: true,
  },
]

// Demo user data
const users: User[] = [
  {
    id: '1',
    name: 'Bernardo',
    email: 'bernardo@example.com',
    age: 24,
  },
  {
    id: '2',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27,
  },
  {
    id: '3',
    name: 'Sarah',
    email: 'sarah@example.com',
  },
  {
    id: '4',
    name: 'Mike',
    email: 'mike@example.com',
  },
]

// Type definitions (Schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
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
}

const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => {
  console.log('The server is up!')
})
