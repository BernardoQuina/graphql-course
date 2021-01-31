import { gql } from '@apollo/client/core'

import { prisma } from '../context'
import { getClient } from './utils/getClient'
import { postOne, seedDatabase, userOne } from './utils/seedDatabase'

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
    query myPostsQuery($userOneId: String!) {
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

test('Should be able to update own post', async () => {
  const updatePost = gql`
    mutation updatePost($postOneId: String!) {
      updatePost(
        whereId: $postOneId
        updateTitle: "new title"
        updateBody: "new post body"
        updatePublished: false
      ) {
        title
        body
        published
      }
    }
  `

  const client = getClient(userOne.jwt)

  const response = await client.mutate({
    mutation: updatePost,
    variables: { postOneId: postOne.post?.id },
  })

  expect(response.data.updatePost.title).toBe('new title')
  expect(response.data.updatePost.body).toBe('new post body')
  expect(response.data.updatePost.published).toBe(false)
})

test('Should create post', async () => {
  const createPost = gql`
    mutation createPost {
      createPost(
        title: "created title"
        body: "created body"
        published: true
      ) {
        title
        body
        published
      }
    }
  `

  const client = getClient(userOne.jwt)

  const response = await client.mutate({ mutation: createPost })

  expect(response.data.createPost.title).toBe('created title')
  expect(response.data.createPost.body).toBe('created body')
  expect(response.data.createPost.published).toBe(true)
})

test('Should delete post', async () => {
  const deletePost = gql`
    mutation deletePost($postOneId: String!) {
      deletePost(id: $postOneId) {
        title
        body
        published
      }
    }
  `

  const client = getClient(userOne.jwt)

  await client.mutate({
    mutation: deletePost,
    variables: { postOneId: postOne.post?.id },
  })

  expect(
    await prisma.post.findUnique({ where: { id: postOne.post?.id } })
  ).toBe(null)
})

afterAll(() => {
  return prisma.$disconnect()
})
