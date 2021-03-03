import { Profile } from 'passport-FACEBOOK-oauth20'
import { User as PrismaUser } from '@prisma/client'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string
      SESSION_SECRET: string
      NODE_ENV: 'development' | 'production'
      PORT: number
      ORIGIN: string
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
      FACEBOOK_CLIENT_ID: string
      FACEBOOK_CLIENT_SECRET: string
      REDIS_URL: string
    }
  }

  namespace Express {
    interface User extends PrismaUser {}
  }
}

export {}
