import { type LngLatLike } from 'mapbox-gl'
import { type Polygon } from 'geojson'
import type { Observation } from './observation.interface'

export interface MapProps {
  mapCoordinates: LngLatLike
  markers?: LngLatLike[]
  polygons?: Polygon[]
  listenToInteraction?: boolean
  observationPopup: Observation | null | undefined
}
