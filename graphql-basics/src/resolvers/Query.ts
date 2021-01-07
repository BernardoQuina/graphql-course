import { DbContext } from '../db'

export const Query = {
  users(parent: any, args: { query: string }, { db }: DbContext, info: any) {
    if (!args.query) {
      return db.users
    }

    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase())
    })
  },
  posts(parent: any, args: { query: string }, { db }: DbContext, info: any) {
    if (!args.query) {
      return db.posts
    }

    return db.posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(args.query.toLowerCase()) ||
        post.body.toLowerCase().includes(args.query.toLowerCase())
      )
    })
  },
  comments(parent: any, args: any, { db }: DbContext, info: any) {
    return db.comments
  },
  me() {
    return {
      id: 'abc123',
      name: 'Bernardo',
      email: 'bernardo@example.com',
      age: 24,
    }
  },
  post() {
    return {
      id: '123084',
      title: 'The title',
      body: 'The body',
      published: true,
    }
  }
}
