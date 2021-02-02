import { gql } from '@apollo/client/core'
import { prisma } from '../context'
import { getClient } from './utils/getClient'
import {
  commentOne,
  // commentTwo,
  // postOne,
  seedDatabase,
  userOne,
  userTwo,
} from './utils/seedDatabase'

beforeAll(seedDatabase)

// const client = getClient()

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

  client.stop()
})

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

  client.stop()
})

// Timeout - Async callback was not invoked (couldn't make ws work...)
// test('Should subscribe to comments for a post', async (done) => {
//   const commentSubByPost = gql`
//     subscription commentSubByPost($postOneId: ID!) {
//       commentSubByPost(postId: $postOneId) {
//         mutation
//         data {
//           id
//           text
//         }
//       }
//     }
//   `

//   client
//     .subscribe({
//       query: commentSubByPost,
//       variables: { postOneId: postOne.post?.id },
//     })
//     .subscribe({
//       next({ data }) {
//         console.log(data)
//         expect(data).not.toBe(null)
//         done()
//       },
//       error(err) {
//         console.error('err', err)
//       },
//     })

//   setTimeout(async () => {
//     const deleteComment = gql`
//       mutation deleteComment($commentTwoId: String!) {
//         deleteComment(id: $commentTwoId) {
//           text
//         }
//       }
//     `

//     const client = getClient(userOne.jwt)

//     await client.mutate({
//       mutation: deleteComment,
//       variables: { commentTwoId: commentTwo.comment?.id },
//     })
//   }, 5000)
// }, 10000)

afterAll(() => {
  return prisma.$disconnect()
})
