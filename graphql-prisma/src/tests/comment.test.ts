import { gql } from '@apollo/client/core'
import { prisma } from '../context'
import { getClient } from './utils/getClient'
import {
  commentOne,
  seedDatabase,
  userOne,
  userTwo,
} from './utils/seedDatabase'

beforeAll(seedDatabase)

test('Should delete own comment', async () => {
  const deleteComment = gql`
    mutation deleteComment($commentOneId: String!) {
      deleteComment(id: $commentOneId) {
        text
      }
    }
  `

  const client = getClient(userTwo.jwt)

  await client.mutate({
    mutation: deleteComment,
    variables: { commentOneId: commentOne.comment?.id },
  })

  expect(
    await prisma.comment.findUnique({ where: { id: commentOne.comment?.id } })
  ).toBe(null)
})

test('Should not delete other users comment', async () => {
  const deleteComment = gql`
    mutation deleteComment($commentOneId: String!) {
      deleteComment(id: $commentOneId) {
        text
      }
    }
  `

  const client = getClient(userOne.jwt) // userOne is not allowed to delete it

  await expect(
    client.mutate({
      mutation: deleteComment,
      variables: { commentOneId: commentOne.comment?.id },
    })
  ).rejects.toThrow()
})

afterAll(() => {
  return prisma.$disconnect()
})
