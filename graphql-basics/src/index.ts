import { GraphQLServer } from 'graphql-yoga'

interface GreetingParams {
  name?: string
  position?: string
}

interface AddParams {
  a: number
  b: number
}

// Type definitions (Schema)
const typeDefs = `
  type Query {
    add(a: Float!, b: Float!): Float!
    greeting(name: String, position: String): String!
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
    add(source: any, args: AddParams, ctx: any, info: any) {
      return args.a + args.b
    },
    greeting(source: any, args: GreetingParams, ctx: any, info: any) {
      if (args.name && args.position) {
        return `Hello, ${args.name}! You are my favorite ${args.position}`
      } else {
        return 'Hello!'
      }
    },
    me() {
      return {
        id: 'abc123',
        name: 'Bernardo',
        email: 'bernardo@example.com',
        age: 24
      }
    },
    post() {
      return {
        id: '123084',
        title: 'The title',
        body: 'The body',
        published: true
      }
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('The server is up!')
})