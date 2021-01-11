import { makeSchema } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import path from 'path'

import { Query } from './query'
import { User, createUser, deleteUser, updateUser } from './user'
import { Post, createPost, updatePost, deletePost } from './post'
import { Comment, createComment, updateComment, deleteComment } from './comment'

export const schema = makeSchema({
  types: {
    Query,
    User,
    Post,
    Comment,
    createUser,
    deleteUser,
    updateUser,
    createPost,
    updatePost,
    deletePost,
    createComment,
    updateComment,
    deleteComment,
  },
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: path.join(process.cwd(), 'src/schema.graphql'),
    typegen: path.join(process.cwd(), 'src/nexus.ts'),
  },
  contextType: {
    module: path.join(process.cwd(), 'src/context.ts'),
    export: 'Context',
  },
})
