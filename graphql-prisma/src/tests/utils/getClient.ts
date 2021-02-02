import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import ws from 'ws'
import { getMainDefinition } from '@apollo/client/utilities'
import fetch from 'node-fetch'

const httpLink = new HttpLink({ uri: 'http://localhost:4000/', fetch: fetch, credentials: 'same-origin' })

const client = new SubscriptionClient('ws://localhost:4000/', { reconnect: true }, ws)

const wsLink = new WebSocketLink(client)

export const getClient = (jsonwebtoken?: string) => {
  const authLink = setContext(() => {
    return {
      headers: {
        Authorization: jsonwebtoken ? `Bearer ${jsonwebtoken}` : '',
      },
    }
  })

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    authLink.concat(httpLink)
  )

  return new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  })
}
