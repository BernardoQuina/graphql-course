import { makeSchema, queryType, objectType, mutationField, nonNull, stringArg, idArg } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import path from 'path'

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
  }
})

const Query = queryType({
  nonNullDefaults: {
    input: true
  },
  definition(t) {
    t.crud.user()
    t.crud.users({ pagination: true, filtering: true })

    // t.field('user', {
    //   type: User,
    //   args: {
    //     id: idArg()
    //   },
    //   resolve: (_root, { id }, ctx) => {
    //     return ctx.prisma.user.findUnique({where: { id }})
    //   }
    // })
  },
})

const createUser = mutationField('createUser', {
  type: User,
  args: { name: nonNull(stringArg()) },
  resolve(_root, { name }, { prisma }) {
    return prisma.user.create({data: { name }})
  }
})

const deleteUser = mutationField('deleteUser', {
  type: User,
  args: {
    id: nonNull(idArg())
  },
  resolve(_root, { id }, { prisma }) {
    return prisma.user.delete({where: { id }})
  }
})

const updateUser = mutationField('updateUser', {
  type: User,
  args: {
    id: nonNull(idArg()),
    name: nonNull(stringArg())
  },
  resolve(_root, { id, name }, { prisma }) {

    return prisma.user.update({where: { id }, data: { name }})
  }
})


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
  }
})
