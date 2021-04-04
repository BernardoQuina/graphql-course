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
  Notification: Prisma.Notification
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    users: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'password' | 'email' | 'googleId' | 'facebookId' | 'photo' | 'cloudinaryPhoto' | 'createdAt' | 'updatedAt' | 'followers' | 'following' | 'posts' | 'comments' | 'likes' | 'myNotification' | 'sentNotification'
      ordering: 'id' | 'name' | 'password' | 'email' | 'googleId' | 'facebookId' | 'photo' | 'cloudinaryPhoto' | 'createdAt' | 'updatedAt'
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
    notifications: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'receiver' | 'receiverId' | 'dispatcher' | 'dispatcherId' | 'seen' | 'read' | 'message' | 'link' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'receiverId' | 'dispatcherId' | 'seen' | 'read' | 'message' | 'link' | 'createdAt' | 'updatedAt'
    }
  },
  User: {
    followers: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'password' | 'email' | 'googleId' | 'facebookId' | 'photo' | 'cloudinaryPhoto' | 'createdAt' | 'updatedAt' | 'followers' | 'following' | 'posts' | 'comments' | 'likes' | 'myNotification' | 'sentNotification'
      ordering: 'id' | 'name' | 'password' | 'email' | 'googleId' | 'facebookId' | 'photo' | 'cloudinaryPhoto' | 'createdAt' | 'updatedAt'
    }
    following: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'name' | 'password' | 'email' | 'googleId' | 'facebookId' | 'photo' | 'cloudinaryPhoto' | 'createdAt' | 'updatedAt' | 'followers' | 'following' | 'posts' | 'comments' | 'likes' | 'myNotification' | 'sentNotification'
      ordering: 'id' | 'name' | 'password' | 'email' | 'googleId' | 'facebookId' | 'photo' | 'cloudinaryPhoto' | 'createdAt' | 'updatedAt'
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
    myNotification: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'receiver' | 'receiverId' | 'dispatcher' | 'dispatcherId' | 'seen' | 'read' | 'message' | 'link' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'receiverId' | 'dispatcherId' | 'seen' | 'read' | 'message' | 'link' | 'createdAt' | 'updatedAt'
    }
    sentNotification: {
      filtering: 'AND' | 'OR' | 'NOT' | 'id' | 'receiver' | 'receiverId' | 'dispatcher' | 'dispatcherId' | 'seen' | 'read' | 'message' | 'link' | 'createdAt' | 'updatedAt'
      ordering: 'id' | 'receiverId' | 'dispatcherId' | 'seen' | 'read' | 'message' | 'link' | 'createdAt' | 'updatedAt'
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
  Notification: {

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
    notification: 'Notification'
    notifications: 'Notification'
  },
  Mutation: {
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'AffectedRowsOutput'
    deleteOneUser: 'User'
    deleteManyUser: 'AffectedRowsOutput'
    upsertOneUser: 'User'
    createOnePost: 'Post'
    updateOnePost: 'Post'
    updateManyPost: 'AffectedRowsOutput'
    deleteOnePost: 'Post'
    deleteManyPost: 'AffectedRowsOutput'
    upsertOnePost: 'Post'
    createOneComment: 'Comment'
    updateOneComment: 'Comment'
    updateManyComment: 'AffectedRowsOutput'
    deleteOneComment: 'Comment'
    deleteManyComment: 'AffectedRowsOutput'
    upsertOneComment: 'Comment'
    createOneLike: 'Like'
    updateOneLike: 'Like'
    updateManyLike: 'AffectedRowsOutput'
    deleteOneLike: 'Like'
    deleteManyLike: 'AffectedRowsOutput'
    upsertOneLike: 'Like'
    createOneNotification: 'Notification'
    updateOneNotification: 'Notification'
    updateManyNotification: 'AffectedRowsOutput'
    deleteOneNotification: 'Notification'
    deleteManyNotification: 'AffectedRowsOutput'
    upsertOneNotification: 'Notification'
  },
  User: {
    id: 'String'
    name: 'String'
    password: 'String'
    email: 'String'
    googleId: 'String'
    facebookId: 'String'
    photo: 'String'
    cloudinaryPhoto: 'Boolean'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    followers: 'User'
    following: 'User'
    posts: 'Post'
    comments: 'Comment'
    likes: 'Like'
    myNotification: 'Notification'
    sentNotification: 'Notification'
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
  Notification: {
    id: 'String'
    receiver: 'User'
    receiverId: 'String'
    dispatcher: 'User'
    dispatcherId: 'String'
    seen: 'Boolean'
    read: 'Boolean'
    message: 'String'
    link: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  User: Typegen.NexusPrismaFields<'User'>
  Post: Typegen.NexusPrismaFields<'Post'>
  Comment: Typegen.NexusPrismaFields<'Comment'>
  Like: Typegen.NexusPrismaFields<'Like'>
  Notification: Typegen.NexusPrismaFields<'Notification'>
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
  