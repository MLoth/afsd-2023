import type { Observation } from './observation.interface'

export interface Location {
  id: string
  name: string
  lastObservations: Observation[]
  area: string
  createdAt?: string
  updatedAt?: string
}
