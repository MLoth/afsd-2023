import { gql } from 'graphql-tag'

export const ALL_OBSERVATIONS = gql`
  query observations {
    observations {
      id
      userUid
      bird {
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
      location {
        id
        name
        lastObservations {
          bird {
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
        area {
          coordinates
          type
        }
        createdAt
        updatedAt
      }
      geolocation {
        coordinates
        type
      }
      description
      createdAt
      updatedAt
    }
  }
`
