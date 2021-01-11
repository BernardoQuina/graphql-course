import { makeSchema } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import path from 'path'

import { Query } from './query'
import { User, createUser, deleteUser, updateUser } from './user'


export const schema = makeSchema({
  types: { Query, User, createUser, deleteUser, updateUser },
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
