import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  split,
} from '@apollo/client/core'
import { getMainDefinition } from '@apollo/client/utilities'

import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { logErrorMessages } from '@vue/apollo-util'

import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

import useFirebase from './useFirebase'

const { firebaseUser } = useFirebase()

const httpLink = createHttpLink({
  // uri: 'http://[::1]:3001/graphql/',
  uri: import.meta.env.VITE_BACKEND_URL,
  credentials: 'same-origin',
})

const errorLink = onError(error => {
  if (import.meta.env.DEV) logErrorMessages(error)
})

const authLink = setContext(async (_, { headers }) => ({
  headers: {
    ...headers,
    authorization: firebaseUser.value
      ? `Bearer ${await firebaseUser.value.getIdToken()}`
      : ``,
  },
}))

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:3001/graphql',
  }),
)

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  from([authLink, errorLink, httpLink]),
)

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(), // <- this is where the cache is created
})
export default () => {
  return {
    apolloClient,
    wsLink,
  }
}
