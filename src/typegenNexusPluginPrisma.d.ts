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
  Like: Prisma.Like
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'password' | 'email' | 'googleId' | 'facebookId' | 'photo' | 'createdAt' | 'updatedAt' | 'posts' | 'comments' | 'likes'
      ordering: 'id' | 'name' | 'password' | 'email' | 'googleId' | 'facebookId' | 'photo' | 'createdAt' | 'updatedAt'
    }
    posts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'body' | 'images' | 'published' | 'createdAt' | 'updatedAt' | 'author' | 'userId' | 'comments' | 'likes'
      ordering: 'id' | 'title' | 'body' | 'images' | 'published' | 'createdAt' | 'updatedAt' | 'userId'
    }
    comments: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'text' | 'createdAt' | 'updatedAt' | 'author' | 'userId' | 'post' | 'postId'
      ordering: 'id' | 'text' | 'createdAt' | 'updatedAt' | 'userId' | 'postId'
    }
    likes: {
      filtering: 'AND' | 'OR' | 'NOT' | 'active' | 'createdAt' | 'updatedAt' | 'author' | 'userId' | 'post' | 'postId'
      ordering: 'active' | 'createdAt' | 'updatedAt' | 'userId' | 'postId'
    }
  },
  User: {
    posts: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'title' | 'body' | 'images' | 'published' | 'createdAt' | 'updatedAt' | 'author' | 'userId' | 'comments' | 'likes'
      ordering: 'id' | 'title' | 'body' | 'images' | 'published' | 'createdAt' | 'updatedAt' | 'userId'
    }
    comments: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'text' | 'createdAt' | 'updatedAt' | 'author' | 'userId' | 'post' | 'postId'
      ordering: 'id' | 'text' | 'createdAt' | 'updatedAt' | 'userId' | 'postId'
    }
    likes: {
      filtering: 'AND' | 'OR' | 'NOT' | 'active' | 'createdAt' | 'updatedAt' | 'author' | 'userId' | 'post' | 'postId'
      ordering: 'active' | 'createdAt' | 'updatedAt' | 'userId' | 'postId'
    }
  }
  Post: {
    comments: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'text' | 'createdAt' | 'updatedAt' | 'author' | 'userId' | 'post' | 'postId'
      ordering: 'id' | 'text' | 'createdAt' | 'updatedAt' | 'userId' | 'postId'
    }
    likes: {
      filtering: 'AND' | 'OR' | 'NOT' | 'active' | 'createdAt' | 'updatedAt' | 'author' | 'userId' | 'post' | 'postId'
      ordering: 'active' | 'createdAt' | 'updatedAt' | 'userId' | 'postId'
    }
  }
  Comment: {

  }
  Like: {

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
    like: 'Like'
    likes: 'Like'
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
    createOneLike: 'Like'
    updateOneLike: 'Like'
    updateManyLike: 'BatchPayload'
    deleteOneLike: 'Like'
    deleteManyLike: 'BatchPayload'
    upsertOneLike: 'Like'
  },
  User: {
    id: 'String'
    name: 'String'
    password: 'String'
    email: 'String'
    googleId: 'String'
    facebookId: 'String'
    photo: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    posts: 'Post'
    comments: 'Comment'
    likes: 'Like'
  }
  Post: {
    id: 'String'
    title: 'String'
    body: 'String'
    images: 'String'
    published: 'Boolean'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    author: 'User'
    userId: 'String'
    comments: 'Comment'
    likes: 'Like'
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
  Like: {
    active: 'Boolean'
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
  Like: Typegen.NexusPrismaFields<'Like'>
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
  