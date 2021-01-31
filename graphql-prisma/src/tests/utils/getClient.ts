import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'
import fetch from 'node-fetch'

export const getClient = () => {
  return new ApolloClient({
    link: createHttpLink({
      uri: 'http://localhost:4000/',
      fetch: fetch,
    }),
    cache: new InMemoryCache(),
  })
}
