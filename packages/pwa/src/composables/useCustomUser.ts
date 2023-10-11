import type { CustomUser } from '@/interfaces/custom.user.interface'
import { provideApolloClient, useQuery } from '@vue/apollo-composable'
import { ref } from 'vue'
import useFirebase from './useFirebase'
import { GET_USER_BY_UID } from '@/graphql/user.query'
import useGraphql from './useGraphql'

const customUser = ref<CustomUser>()

const { firebaseUser } = useFirebase()
const { apolloClient } = useGraphql()

provideApolloClient(apolloClient)

const restoreCustomUser = async () => {
  return new Promise<void>(resolve => {
    const { onResult } = useQuery(GET_USER_BY_UID, {
      uid: firebaseUser.value?.uid,
    })
    onResult(result => {
      if (result.data) {
        console.log(result)
        customUser.value = result.data.userByUid
        resolve()
      }
    })
  })
}

export default () => {
  return {
    customUser,
    restoreCustomUser,
  }
}
