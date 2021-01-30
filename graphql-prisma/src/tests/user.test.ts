import { ApolloClient, gql, InMemoryCache, createHttpLink } from '@apollo/client/core'
import fetch from 'node-fetch'

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:4000/',
    fetch: fetch
  }),
  cache: new InMemoryCache(),
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
    mutation: createUser
  })
})