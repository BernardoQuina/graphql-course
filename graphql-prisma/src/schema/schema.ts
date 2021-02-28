import { makeSchema } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import path from 'path'

import * as UserTypes from './User/type'
import * as userQueries from './User/queries'
import * as userMutations from './User/mutations'
import * as userSubscriptions from './User/subscriptions'

import { Post } from './Post/type'
import * as postQueries from './Post/queries'
import * as postMutations from './Post/mutations'
import * as postSubscriptions from './Post/subscriptions'

import { Comment } from './Comment/type'
import * as commentQueries from './Comment/queries'
import * as commentMutations from './Comment/mutations'
import * as commentSubscriptions from './Comment/subscriptions'

// makeSchema defines the GraphQL schema, by combining the GraphQL types defined
// by the GraphQL Nexus layer or any manually defined GraphQLType objects
export const schema = makeSchema({
  types: {
    UserTypes,
    userQueries,
    userMutations,
    userSubscriptions,
    Post,
    postQueries,
    postMutations,
    postSubscriptions,
    Comment,
    commentQueries,
    commentMutations,
    commentSubscriptions,
  },
  // shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
      // shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
      outputs: {
        // We need it in src because production build will crash at tsc compiling
        typegen: path.join(process.cwd(), 'src/typegenNexusPluginPrisma.d.ts'),
      },
      paginationStrategy: 'prisma'
    }),
  ],
  outputs: {
    // GraphQL SDL file generation
    schema: path.join(process.cwd(), 'src/schema.graphql'),

    // TypeScript declaration file generation settings. This file contains types
    // reflected off the source code
    typegen: path.join(process.cwd(), 'src/nexus.ts'),
  },
  contextType: {
    // Path to the module where the context type is exported
    module: path.join(process.cwd(), 'src/context.ts'),
    export: 'Context',
  },
})
