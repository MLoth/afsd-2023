import type { Bird } from './bird.interface'
import type { Location } from './location.interface'

export interface Observation {
  id: string
  userUid: string
  bird: Bird
  location: Location
  geolocation: GeoJSON.Point
  description: string
  createdAt: string
  updatedAt: string
}
