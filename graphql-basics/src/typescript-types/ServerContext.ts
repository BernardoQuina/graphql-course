import { Post } from './Post'
import { User } from './User'
import { Comment } from './Comment'
import { PubSub } from 'graphql-yoga'

export type ServerContext = {
  db: {
    users: User[]
    posts: Post[]
    comments: Comment[]
  },
  pubSub: PubSub
}