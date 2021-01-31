import { gql } from '@apollo/client/core'

import { prisma } from '../context'
import { getClient } from './utils/getClient'
import { seedDatabase } from './utils/seedDatabase'

const client = getClient()

beforeEach(seedDatabase)

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

afterAll(() => {
  return prisma.$disconnect()
})
