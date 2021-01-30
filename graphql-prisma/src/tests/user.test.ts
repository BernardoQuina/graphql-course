import {
  ApolloClient,
  gql,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/core'
import fetch from 'node-fetch'
import { prisma } from '../context'

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:4000/',
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
})

beforeAll(async () => {
  // clear database
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  // create dummy user
  await prisma.user.create({
    data: { name: 'jen', email: 'jen@example.com', password: 'jenjenjen' },
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

  await client.mutate({
    mutation: createUser,
  })
})


afterAll(() => {
  return prisma.$disconnect()
})