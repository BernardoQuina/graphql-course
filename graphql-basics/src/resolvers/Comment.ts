import { DbContext } from '../db'
import { Comment } from '../typescript-types/Comment'

export const CommentResolver = {
  author(parent: Comment, args: any, { db }: DbContext, info: any) {
    return db.users.find((user) => {
      return user.id === parent.author
    })
  },
  post(parent: Comment, args: any, { db }: DbContext, info: any) {
    return db.posts.find((post) => {
      return post.id === parent.post
    })
  },
}