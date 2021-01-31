import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import fetch from 'node-fetch'

const httpLink = createHttpLink({ uri: 'http://localhost:4000/', fetch: fetch })

export const getClient = (jsonwebtoken?: string) => {
  const authLink = setContext(() => {
    return {
      headers: {
        Authorization: jsonwebtoken ? `Bearer ${jsonwebtoken}` : '',
      },
    }
  })
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}
