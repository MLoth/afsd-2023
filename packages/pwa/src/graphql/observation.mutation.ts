import type { Observation } from '@/interfaces/observation.interface'
import { gql, type TypedDocumentNode } from '@apollo/client'

export const ADD_OBSERVATION: TypedDocumentNode<
  { createObservation: Observation },
  {
    observationInput: {
      userUid: string | undefined
      birdId: string
      locationId: string
      description: string
      geolocation: {
        type: string
        coordinates: number[]
      }
    }
  }
> = gql`
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
