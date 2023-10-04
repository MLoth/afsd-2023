import {
  createHttpLink,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import useFirebase from './useFirebase'

const { firebaseUser } = useFirebase()

const httpLink = createHttpLink({
  uri: 'http://[::1]:3001/graphql/',
  credentials: 'same-origin',
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
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(), // <- this is where the cache is created
})

export default () => {
  return {
    apolloClient,
  }
}
