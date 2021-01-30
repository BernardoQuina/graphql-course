import {
  ApolloClient,
  gql,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/core'
import fetch from 'node-fetch'
import { prisma } from '../context'
import bcrypt from 'bcryptjs'

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:4000/',
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
})

beforeEach(async () => {
  // clear database
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  // create dummy user
  await prisma.user.create({
    data: {
      name: 'jen',
      email: 'jen@example.com',
      password: bcrypt.hashSync('jenjenjen'),
    },
  })

  // create dummy posts
  await prisma.post.create({
    data: {
      title: 'dummy post',
      body: 'dummy post body',
      published: true,
      author: { connect: { email: 'jen@example.com' } },
    },
  })

  await prisma.post.create({
    data: {
      title: 'dummy post 2',
      body: 'dummy post body 2',
      published: false,
      author: { connect: { email: 'jen@example.com' } },
    },
  })
})

test('Should create a new user', async () => {
  const createUser = gql`
    mutation {
      createUser(
        name: "bernardo"
        email: "bernardo@example.com"
        password: "bernardobernardo"
      ) {
        token
        user {
          id
          name
        }
      }
    }
  `

  const response = await client.mutate({
    mutation: createUser,
  })

  const exists = await prisma.user.findUnique({
    where: { id: response.data.createUser.user.id },
  })

  expect(exists).toBeTruthy()
})

test('Should expose author profile', async () => {
  const getUsers = gql`
    query {
      users {
        id
        name
        email
      }
    }
  `

  const response = await client.query({
    query: getUsers,
  })

  expect(response.data.users.length).toBe(1)
  expect(response.data.users[0].email).toBeNull()
  expect(response.data.users[0].name).toBe('jen')
})

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

test('Should not login with bad credentials', async () => {
  const loginUser = gql`
    mutation {
      loginUser(email: "jen@example.com", password: "wrongPassword") {
        token
      }
    }
  `

  await expect(client.mutate({ mutation: loginUser })).rejects.toThrow()
})

test('Should not sign up user with invalid password', async () => {
  const createUser = gql`
    mutation {
      createUser(
        name: "rita"
        email: "rita@example.com"
        password: "rita"
      ) {
        token
        user {
          id
        }
      }
    }
  `

  await expect(client.mutate({mutation: createUser})).rejects.toThrow()
})

afterAll(() => {
  return prisma.$disconnect()
})
