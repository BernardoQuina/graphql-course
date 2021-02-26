import { ApolloServer } from 'apollo-server-express'
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import { createServer } from 'http'

import { schema } from './schema/schema'
import { createContext } from './context'

dotenv.config()

const main = async () => {
  const app = express()

  app.use(
    cors({
      origin: process.env.ORIGIN,
      credentials: true,
    })
  )

  const apolloServer = new ApolloServer({
    schema,
    context: createContext
  })

  apolloServer.applyMiddleware({ app, cors: false })

  app.get('/', (_, res) => {
    res.send('hello world')
  })

  const server = createServer(app)

  apolloServer.installSubscriptionHandlers(server)

  server.listen(process.env.PORT, () => {
    console.log(`server started on port:${process.env.PORT}`)
  })
}


main().catch(err => {
  console.log(err)
})