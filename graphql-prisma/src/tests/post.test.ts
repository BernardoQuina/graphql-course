import { gql } from '@apollo/client/core'

import { prisma } from '../context'
import { getClient } from './utils/getClient'
import { seedDatabase, userOne } from './utils/seedDatabase'

const client = getClient()

beforeAll(seedDatabase)

test('Should only query published post', async () => {
  const getPosts = gql`
    query {
      posts {
        id
        published
      }
    }
  `

  const response = await client.query({
    query: getPosts,
  })

  expect(response.data.posts.length).toBe(1)
  expect(response.data.posts[0].published).toBe(true)
})

test('Should query my posts, including unpublished ones', async () => {
  const getMyPosts = gql`
    query MyPostsQuery($userOneId: String!) {
      posts(where: { userId: { equals: $userOneId } }) {
        id
        published
      }
    }
  `

  const client = getClient(userOne.jwt)

  const response = await client.query({
    query: getMyPosts,
    variables: { userOneId: userOne.user?.id },
  })

  expect(response.data.posts.length).toBe(2)
  expect(response.data.posts[1].published).toBe(false) // authenticated only
})

afterAll(() => {
  return prisma.$disconnect()
})
