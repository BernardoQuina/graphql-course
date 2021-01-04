import { GraphQLServer } from 'graphql-yoga'

interface GreetingParams {
  name?: string
  position?: string
}

interface AddParams {
  numbers: number[]
}

// Type definitions (Schema)
const typeDefs = `
  type Query {
    add(numbers: [Float]!): Float!
    greeting(name: String, position: String): String!
    grades: [Int!]!
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
      if (args.numbers.length === 0) {
        return 0
      } else {
        return args.numbers.reduce((a, b) => a + b, 0)
      }
    },
    greeting(source: any, args: GreetingParams, ctx: any, info: any) {
      if (args.name && args.position) {
        return `Hello, ${args.name}! You are my favorite ${args.position}`
      } else {
        return 'Hello!'
      }
    },
    grades(parent: any, args: any, ctx: any, info: any) {
      return [99, 80, 93]
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