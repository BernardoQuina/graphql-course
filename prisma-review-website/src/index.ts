import { ApolloServer } from 'apollo-server'
import { createContext } from './context'
import { schema } from './schema/schema'

const server = new ApolloServer({
  schema,
  context: createContext,
  tracing: true
})

server.listen(4001, () => {
  console.log('Server started on port: 4001')
})