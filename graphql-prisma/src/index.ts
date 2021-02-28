import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'
import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

import './util/passport'
import { schema } from './schema/schema'
import { createContext, prisma } from './context'

dotenv.config()

const main = async () => {
  const app = express()

  app.use(express.json())

  app.use(
    cors({
      origin: process.env.ORIGIN,
      credentials: true,
    })
  )

  app.use(
    session({
      secret: 'secretCode',
      resave: true,
      saveUninitialized: true,
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser((user, done) => {
    return done(null, user.id)
  })

  passport.deserializeUser(async (id: string, done) => {
    const user = await prisma.user.findUnique({ where: { id } })

    return done(null, user)
  })

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      // Called on successful authentication
      async (_accessToken, _refreshToken, profile, cb) => {
        const userExists = await prisma.user.findUnique({
          where: { googleId: profile.id },
        })

        if (!userExists) {
          const newUser = await prisma.user.create({
            data: {
              name: profile.displayName,
              email: profile.emails![0].value,
              googleId: profile.id,
            },
          })

          cb(undefined, newUser)
        } else {
          cb(undefined, userExists)
        }
      }
    )
  )

  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  )

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: 'http://localhost:3000/login',
      successRedirect: 'http://localhost:3000',
    })
  )

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
