import { gql } from '@apollo/client/core'

import { prisma } from '../context'
import { getClient } from './utils/getClient'
import { seedDatabase, userOne } from './utils/seedDatabase'

const client = getClient()

beforeAll(seedDatabase)

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

  expect(response.data.users.length).toBe(3) // Jen + +Sam + Bernardo
  expect(response.data.users[0].email).toBeNull()
  expect(response.data.users[0].name).toBe('jen')
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
      createUser(name: "rita", email: "rita@example.com", password: "rita") {
        token
        user {
          id
        }
      }
    }
  `

  await expect(client.mutate({ mutation: createUser })).rejects.toThrow()
})

test('Should fetch user profile via token', async () => {
  const client = getClient(userOne.jwt)
  const getProfile = gql`
    query {
      me {
        name
        email
      }
    }
  `

  const response = await client.query({ query: getProfile })

  expect(response.data.me).toEqual({
    __typename: 'User',
    name: 'jen',
    email: 'jen@example.com',
  })

  client.stop()
})

afterAll(async () => {
  await prisma.$disconnect()
  client.stop()
})
