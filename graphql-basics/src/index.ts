import { GraphQLServer } from 'graphql-yoga'

import db from './db'
import { CommentResolver } from './resolvers/Comment'
import { Query } from './resolvers/Query'
import { Mutation } from './resolvers/Mutation'
import { PostResolver } from './resolvers/Post'
import { UserResolver } from './resolvers/User'

// Resolvers
const resolvers = {
  Mutation,
  Query,
  Post: PostResolver,
  User: UserResolver,
  Comment: CommentResolver,
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db,
  },
})

server.start(() => {
  console.log('The server is up!')
})
