import { PrismaClient } from '@prisma/client'
import { PubSub } from 'apollo-server'

// Type-safe database client for TypeScript & Node.js (ORM replacement)
const prisma = new PrismaClient({ log: ['query'] })
const pubsub = new PubSub()

export type Request = {
  req: { headers: { authorization?: string } }
}
export interface Context {
  prisma: PrismaClient,
  pubsub: PubSub,
  request: Request
}

// Provided to ApolloServer in index.ts
export const createContext = (request: Request): Context => {
  return { prisma, pubsub, request }
}
