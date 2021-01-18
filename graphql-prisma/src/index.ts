import { ApolloServer } from 'apollo-server'
import { schema } from './schema/schema'
import { createContext } from './context'
import dotenv from 'dotenv'

dotenv.config()

const server = new ApolloServer({
  schema,
  context: createContext,
  tracing: true,
})

server.listen(4000, () => {
  console.log('Server started on port: 4000')
})
