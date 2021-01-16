import { makeSchema } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import path from 'path'

import { User } from './User/type'
import * as userQueries from './User/queries'
import * as userMutations from './User/mutations'

import { Book } from './Book/type'
import * as bookQueries from './Book/queries'
import * as bookMutations from './Book/mutations'
import * as bookSubscriptions from './Book/subscriptions'

import { Review } from './Review/type'
import * as reviewQueries from './Review/queries'
import * as reviewMutations from './Review/mutations'


// makeSchema defines the GraphQL schema, by combining the the GraphQL types defined
// by the GraphQL Nexus layer or any manually defined GraphQLType objects
export const schema = makeSchema({
  types: {
    User,
    userQueries,
    userMutations,
    Book,
    bookQueries,
    bookMutations,
    bookSubscriptions,
    Review,
    reviewQueries,
    reviewMutations
    
  },
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    // GraphQL SDL file generation
    schema: path.join(process.cwd(), 'src/schema.graphql'),

    // Typescript declaration file generation settings. This file contains types
    // reflected off the source code
    typegen: path.join(process.cwd(), 'src/nexus.ts'),
  },
  contextType: {
    // Path to the module where the context type is exported
    module: path.join(process.cwd(), 'src/context.ts'),
    export: 'Context'
  }
})