import { Post, Comment, User } from '@prisma/client'
import { RedisPubSub } from 'graphql-redis-subscriptions'

type Payload = {
  mutation: 'CREATED' | 'UPDATED'| 'DELETED'
  data: User | Post | Comment
}

export const pubsubPublishMany = (
  pubsub: RedisPubSub,
  stringArr: string[],
  payload: Payload
) => {
  stringArr.forEach((string) => {
    pubsub.publish(string, payload)
  })
}
