import { User as UserDef } from '@prisma/client' // From prisma User model
import { objectType } from 'nexus'
import { getUserId } from '../../util/getUserId'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email({
      async resolve(_root: UserDef, args, ctx, info, originalResolver) {
        const res = await originalResolver(_root, args, ctx, info)
        const userId = getUserId(ctx.request, false)

        // info.operation.selectionSet.selections[0].name.value

        const operation = (info.operation.selectionSet.selections[0] as any)
          .name.value as string

        if (userId === _root.id || operation === 'loginUser') {
          return res
        }
        return null
      },
    })
    t.model.password({
      description: 'Only logged in user can query it but its hashed anyway',
      async resolve(_root: UserDef, args, ctx, info, originalResolver) {
        const res = await originalResolver(_root, args, ctx, info)
        const userId = getUserId(ctx.request, false)

        if (userId === _root.id) {
          return res
        }
        return null
      },
    })
    t.model.createdAt()
    t.model.updatedAt()
    t.model.posts()
    t.model.comments()
  },
})

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.field('user', { type: 'User' })
    t.field('token', { type: 'String' })
  },
})
