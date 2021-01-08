import { ServerContext } from '../typescript-types/ServerContext'

export const Subscription = {
  comment: {
    subscribe(parent: any, { postId }: any, { pubSub, db }: ServerContext, info: any) {
      const post = db.posts.find(post => post.id === postId && post.published)

      if (!post) {
        throw new Error('Post not found')
      }

      return pubSub.asyncIterator(`comment ${postId}`)
    }
  }
}
