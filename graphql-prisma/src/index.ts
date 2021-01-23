import { ApolloServer } from 'apollo-server'
import { schema } from './schema/schema'
import { createContext } from './context'
import dotenv from 'dotenv'

dotenv.config()

const server = new ApolloServer({
  schema,
  context: createContext,
  tracing: process.env.NODE_ENV === 'development',
})

const port = process.env.PORT || 4000

server.listen({ port })
