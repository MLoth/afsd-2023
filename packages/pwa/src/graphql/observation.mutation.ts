import { gql } from 'graphql-tag'

export const ADD_OBSERVATION = gql`
  mutation createObservation($observationInput: CreateObservationInput!) {
    createObservation(createObservationInput: $observationInput) {
      id
      userUid
      bird {
        id
      }
    }
  }
`
