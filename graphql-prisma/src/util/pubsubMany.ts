import { Post, Comment, User } from '@prisma/client'
import { PubSub } from 'apollo-server-express'

type Payload = {
  mutation: 'CREATED' | 'UPDATED'| 'DELETED'
  data: User | Post | Comment
}

export const pubsubPublishMany = (
  pubsub: PubSub,
  stringArr: string[],
  payload: Payload
) => {
  stringArr.forEach((string) => {
    pubsub.publish(string, payload)
  })
}
