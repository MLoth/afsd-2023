import type { Bird } from '@/interfaces/bird.interface'
import { gql, type TypedDocumentNode } from '@apollo/client/core'

export const ALL_BIRDS: TypedDocumentNode<{ birds: Bird[] }> = gql`
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

export const FIND_BIRDS_BY_SEARCH_STRING: TypedDocumentNode<
  { findBirdsBySearchString: Bird[] },
  { searchString: string }
> = gql`
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

export const GET_BIRD_BY_NAME: TypedDocumentNode<
  { bird: Bird },
  { name: string }
> = gql`
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
