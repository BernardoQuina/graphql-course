import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.password({description: 'Its hashed... obviously'})
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
