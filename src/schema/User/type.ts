import { User as UserDef } from '@prisma/client' // From prisma User model
import { objectType } from 'nexus'
import { isAuth } from '../../util/isAuth'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email({
      async resolve(_root: UserDef, args, ctx, info, originalResolver) {
        const res = await originalResolver(_root, args, ctx, info)
        const userId = isAuth(ctx, false)

        // info.operation.selectionSet.selections[0].name.value

        const operation = (info.operation.selectionSet.selections[0] as any)
          .name.value as string

        if (
          userId === _root.id ||
          operation === 'loginUser' ||
          operation === 'createUser' ||
          operation === 'changePassword'
        ) {
          return res
        }
        return null
      },
    })
    t.model.password({
      description: 'Only logged in user can query it but its hashed anyway',
      async resolve(_root: UserDef, args, ctx, info, originalResolver) {
        const res = await originalResolver(_root, args, ctx, info)
        const userId = isAuth(ctx, false)

        if (userId === _root.id) {
          return res
        }
        return null
      },
    })
    t.model.googleId()
    t.model.facebookId()
    t.model.photo()
    t.model.cloudinaryPhoto()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.followers()
    t.model.following()
    t.model.posts()
    t.model.comments()
    t.model.likes()
    t.model.myNotification()
    t.model.sentNotification()

    t.field('followersCount', {
      type: 'Int',
      resolve(root, _, { prisma }) {
        return prisma.user.count({
          where: { following: { some: { id: root.id! } } },
        })
      },
    })

    t.field('followingCount', {
      type: 'Int',
      resolve(root, _, { prisma }) {
        return prisma.user.count({
          where: { followers: { some: { id: root.id! } } },
        })
      },
    })

    t.field('followsMe', {
      type: 'Boolean',
      async resolve(root, _, context) {
        const myId = isAuth(context, false)

        if (!myId) return false

        const followsMe = await context.prisma.user.findFirst({
          where: { id: root.id!, following: { some: { id: myId } } },
        })

        if (followsMe) return true

        return false
      },
    })

    t.field('IFollow', {
      type: 'Boolean',
      async resolve(root, _, context) {
        const myId = isAuth(context, false)

        if (!myId) return false


        const IFollow = await context.prisma.user.findFirst({
          where: { id: myId, following: { some: { id: root.id! } } },
        })

        if(IFollow) return true

        return false
      }
    })
  },
})
