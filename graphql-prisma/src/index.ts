import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'
import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'

import { passportOauth } from './util/passport'
import { schema } from './schema/schema'
import { createContext, redis } from './context'

dotenv.config()

const main = async () => {
  const app = express()

  const RedisStore = connectRedis(session)

  app.use(express.json())

  app.use(
    cors({
      origin: process.env.ORIGIN,
      credentials: true,
    })
  )

  app.set('trust proxy', 1)

  app.use(
    session({
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7, // One Week,
      },
    })
  )

  passportOauth(app)

  const apolloServer = new ApolloServer({
    schema,
    context: createContext,
  })

  apolloServer.applyMiddleware({ app, cors: false })

  const server = createServer(app)

  apolloServer.installSubscriptionHandlers(server)

  server.listen(process.env.PORT, () => {
    console.log(`server started on port:${process.env.PORT}`)
  })
}

main().catch((err) => {
  console.log(err)
})
