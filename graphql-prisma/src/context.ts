import { PrismaClient } from '@prisma/client'
import { PubSub } from 'apollo-server'
import { Request, Response } from 'express'

// Type-safe database client for TypeScript & Node.js (ORM replacement)
export const prisma = new PrismaClient({ log: ['query'] })
const pubsub = new PubSub()

// export type Request = {
//   req: { headers: { authorization?: string } }
//   connection: { context: { Authorization?: string } }
// }
export type Context = {
  prisma: PrismaClient
  pubsub: PubSub
  req: Request,
  res: Response
}

// Provided to ApolloServer in index.ts
export const createContext = ({req, res}: Context): Context => {
  return { prisma, pubsub, req, res }
}