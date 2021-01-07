import { DbContext } from '../db'
import { Post } from '../typescript-types/Post'

export const PostResolver = {
  author(parent: Post, args: any, { db }: DbContext, info: any) {
    return db.users.find((user) => {
      return user.id === parent.author
    })
  },
  comments(parent: Post, args: any, { db }: DbContext, info: any) {
    return db.comments.filter((comment) => {
      return comment.post === parent.id
    })
  },
}
