import { ServerContext } from '../typescript-types/ServerContext'
import { Post } from '../typescript-types/Post'

export const PostResolver = {
  author(parent: Post, args: any, { db }: ServerContext, info: any) {
    return db.users.find((user) => {
      return user.id === parent.author
    })
  },
  comments(parent: Post, args: any, { db }: ServerContext, info: any) {
    return db.comments.filter((comment) => {
      return comment.post === parent.id
    })
  },
}
