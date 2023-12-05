import type { CustomUser } from '@/interfaces/custom.user.interface'
import { gql, type TypedDocumentNode } from '@apollo/client/core'

export const ADD_USER: TypedDocumentNode<{ createUser: CustomUser }> = gql`
  mutation ($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      uid
      locale
      role
    }
  }
`
