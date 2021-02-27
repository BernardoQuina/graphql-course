import { PrismaClient } from '@prisma/client'
import { PubSub } from 'apollo-server-express'
import { Request, Response } from 'express'

// Type-safe database client for TypeScript & Node.js (ORM replacement)
export const prisma = new PrismaClient({ log: ['query'] })
const pubsub = new PubSub()

export type Context = {
  prisma: PrismaClient
  pubsub: PubSub
  req: Request,
  res: Response,
  connection: { context: { Authorization?: string } }
}

// Provided to ApolloServer in index.ts
export const createContext = ({req, res, connection}: Context): Context => {
  return { prisma, pubsub, req, res, connection }
}