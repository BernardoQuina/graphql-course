import * as Typegen from 'nexus-plugin-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
    take?: boolean
    skip?: boolean
    cursor?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime'

// Prisma model type definitions
interface PrismaModels {
  User: Prisma.User
  Post: Prisma.Post
  Comment: Prisma.Comment
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'password' | 'email' | 'googleId' | 'createdAt' | 'updatedAt' | 'posts' | 'comments'
      ordering: 'id' | 'name' | 'password' | 'email' | 'googleId' | 'createdAt' | 'updatedAt'
    }
    posts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'body' | 'published' | 'createdAt' | 'updatedAt' | 'author' | 'userId' | 'comments'
      ordering: 'id' | 'title' | 'body' | 'published' | 'createdAt' | 'updatedAt' | 'userId'
    }
    comments: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'text' | 'createdAt' | 'updatedAt' | 'author' | 'userId' | 'post' | 'postId'
      ordering: 'id' | 'text' | 'createdAt' | 'updatedAt' | 'userId' | 'postId'
    }
  },
  User: {
    posts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'body' | 'published' | 'createdAt' | 'updatedAt' | 'author' | 'userId' | 'comments'
      ordering: 'id' | 'title' | 'body' | 'published' | 'createdAt' | 'updatedAt' | 'userId'
    }
    comments: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'text' | 'createdAt' | 'updatedAt' | 'author' | 'userId' | 'post' | 'postId'
      ordering: 'id' | 'text' | 'createdAt' | 'updatedAt' | 'userId' | 'postId'
    }
  }
  Post: {
    comments: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'text' | 'createdAt' | 'updatedAt' | 'author' | 'userId' | 'post' | 'postId'
      ordering: 'id' | 'text' | 'createdAt' | 'updatedAt' | 'userId' | 'postId'
    }
  }
  Comment: {

  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    user: 'User'
    users: 'User'
    post: 'Post'
    posts: 'Post'
    comment: 'Comment'
    comments: 'Comment'
  },
  Mutation: {
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'BatchPayload'
    deleteOneUser: 'User'
    deleteManyUser: 'BatchPayload'
    upsertOneUser: 'User'
    createOnePost: 'Post'
    updateOnePost: 'Post'
    updateManyPost: 'BatchPayload'
    deleteOnePost: 'Post'
    deleteManyPost: 'BatchPayload'
    upsertOnePost: 'Post'
    createOneComment: 'Comment'
    updateOneComment: 'Comment'
    updateManyComment: 'BatchPayload'
    deleteOneComment: 'Comment'
    deleteManyComment: 'BatchPayload'
    upsertOneComment: 'Comment'
  },
  User: {
    id: 'String'
    name: 'String'
    password: 'String'
    email: 'String'
    googleId: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    posts: 'Post'
    comments: 'Comment'
  }
  Post: {
    id: 'String'
    title: 'String'
    body: 'String'
    published: 'Boolean'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    author: 'User'
    userId: 'String'
    comments: 'Comment'
  }
  Comment: {
    id: 'String'
    text: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    author: 'User'
    userId: 'String'
    post: 'Post'
    postId: 'String'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  User: Typegen.NexusPrismaFields<'User'>
  Post: Typegen.NexusPrismaFields<'Post'>
  Comment: Typegen.NexusPrismaFields<'Comment'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  