import { GraphQLServer, PubSub } from 'graphql-yoga'

import db from './db'
import { Query } from './resolvers/Query'
import { Mutation } from './resolvers/Mutation'
import { Subscription } from './resolvers/Subscription'
import { PostResolver } from './resolvers/Post'
import { UserResolver } from './resolvers/User'
import { CommentResolver } from './resolvers/Comment'

const pubSub = new PubSub()

// Resolvers
const resolvers = {
  Mutation,
  Query,
  Subscription,
  Post: PostResolver,
  User: UserResolver,
  Comment: CommentResolver,
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db,
    pubSub
  },
})

server.start(() => {
  console.log('The server is up!')
})
