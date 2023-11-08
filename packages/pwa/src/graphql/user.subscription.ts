import gql from 'graphql-tag'

export const USER_CREATED = gql`
  subscription newUserWasCreated {
    newUserWasCreated {
      content
      who
    }
  }
`
