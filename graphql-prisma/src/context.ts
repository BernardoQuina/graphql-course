import { PrismaClient } from '@prisma/client'

// Type-safe database client for TypeScript & Node.js (ORM replacement)
const prisma = new PrismaClient({ log: ['query'] })

export interface Context {
  prisma: PrismaClient
}

// Provided to ApolloServer in index.ts
export const createContext = (): Context => {
  return { prisma }
}
