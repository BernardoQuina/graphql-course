import { GraphQLServer } from 'graphql-yoga'



// Type definitions (Schema)
const typeDefs = `
  type Query {
    title: String!
    price: Float!
    releaseYear: Int
    rating: Float
    inStock: Boolean!
  }
`

// Resolvers
const resolvers = {
  Query: {
    title() {
      return 'Lord Of The Rings'
    },
    price() {
      return 9.99
    },
    releaseYear() {
      return null
    },
    rating() {
      return 4.9
    },
    inStock() {
      return true
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