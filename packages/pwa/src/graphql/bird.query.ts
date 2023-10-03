import gql from 'graphql-tag'

export const ALL_BIRDS = gql`
  query birds {
    birds {
      __typename
      id
      name
      fullname
      category
      url
      observations
      description
      createdAt
      updatedAt
    }
  }
`
