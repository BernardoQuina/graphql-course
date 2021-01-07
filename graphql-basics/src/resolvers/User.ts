import { DbContext } from '../db'
import { User } from '../typescript-types/User'

export const UserResolver = {
  posts(parent: User, args: any, { db }: DbContext, info: any) {
    return db.posts.filter((post) => {
      return post.author === parent.id
    })
  },
  comments(parent: User, args: any, { db }: DbContext, info: any) {
    return db.comments.filter((comment) => {
      return comment.author === parent.id
    })
  },
}