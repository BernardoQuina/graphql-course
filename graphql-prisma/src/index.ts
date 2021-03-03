import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'
import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import Redis from 'ioredis'
import connectRedis from 'connect-redis'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import './util/passport'
import { schema } from './schema/schema'
import { createContext, prisma } from './context'

dotenv.config()

const main = async () => {
  const app = express()

  const RedisStore = connectRedis(session)
  const redis = new Redis(process.env.REDIS_URL)

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
          where: { email: profile.emails![0].value },
        })

        if (!userExists) {
          const newUser = await prisma.user.create({
            data: {
              name: profile.displayName,
              email: profile.emails![0].value,
              googleId: profile.id,
              photo: profile.photos![0].value,
            },
          })

          cb(undefined, newUser)
        } else {
          cb(undefined, userExists)
        }
      }
    )
  )

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: '/auth/facebook/callback',
      },
      // Called on successful authentication
      async (_accessToken, _refreshToken, profile, cb) => {
        const userExists = await prisma.user.findUnique({
          where: { email: profile.emails![0].value },
        })

        if (!userExists) {
          const newUser = await prisma.user.create({
            data: {
              name: profile.displayName,
              email: profile.emails![0].value,
              photo: profile.photos![0].value,
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
      failureRedirect: `${process.env.ORIGIN}/login`,
      successRedirect: process.env.ORIGIN,
    })
  )

  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', { scope: ['profile', 'email'] })
  )

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: `${process.env.ORIGIN}/login`,
      successRedirect: process.env.ORIGIN,
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
