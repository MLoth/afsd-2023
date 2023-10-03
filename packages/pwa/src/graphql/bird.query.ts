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

export const FIND_BIRDS_BY_SEARCH_STRING = gql`
  query findBirdsBySearchString($searchString: String!) {
    findBirdsBySearchString(searchString: $searchString) {
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

export const GET_BIRD_BY_NAME = gql`
  query bird($name: String!) {
    bird(name: $name) {
      id
      name
      fullname
      description
      category
      url
      observations
    }
  }
`
