import { Book, Review, User } from '@prisma/client'
import { PubSub } from 'apollo-server'

type Payload = {
  mutation: 'CREATED' | 'UPDATED'| 'DELETED'
  data: User | Book | Review
}

export const pubsubPublishMany = (
  stringArr: string[],
  pubsub: PubSub,
  payload: Payload
) => {
  stringArr.forEach((string) => {
    pubsub.publish(string, payload)
  })
}
