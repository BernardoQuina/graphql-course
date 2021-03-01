import { PrismaClient } from '@prisma/client'
import { PubSub } from 'apollo-server-express'
import { Request, Response } from 'express'
import Redis from 'ioredis'

// Type-safe database client for TypeScript & Node.js (ORM replacement)
export const prisma = new PrismaClient({ log: ['query'] })
const redis = new Redis(process.env.REDIS_URL)
const pubsub = new PubSub()

export type Context = {
  redis: Redis.Redis
  prisma: PrismaClient
  pubsub: PubSub
  req: Request,
  res: Response,
  connection: { context: { Authorization?: string } }
}

// Provided to ApolloServer in index.ts
export const createContext = ({req, res, connection}: Context): Context => {
  return { redis, prisma, pubsub, req, res, connection }
}