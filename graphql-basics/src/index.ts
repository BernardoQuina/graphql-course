import { GraphQLServer } from 'graphql-yoga'



// Type definitions (Schema)
const typeDefs = `
  type Query {
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