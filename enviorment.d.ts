import { Profile } from 'passport-FACEBOOK-oauth20'
import { User as PrismaUser } from '@prisma/client'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      PORT: number
      ORIGIN: string
      SESSION_SECRET: string
      REDIS_URL: string
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
      FACEBOOK_CLIENT_ID: string
      FACEBOOK_CLIENT_SECRET: string
      NODE_TLS_REJECT_UNAUTHORIZED: string
      FORGOT_PASSWORD_PREFIX:  string
      EMAIl: string
      EMAIL_PASS: string
    }
  }

  namespace Express {
    interface User extends PrismaUser {}
  }
}

export {}
