import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { logErrorMessages } from '@vue/apollo-util'

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

const apolloClient = new ApolloClient({
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(), // <- this is where the cache is created
})

export default () => {
  return {
    apolloClient,
  }
}
