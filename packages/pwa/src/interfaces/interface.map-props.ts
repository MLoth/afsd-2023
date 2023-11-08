import { type LngLatLike } from 'mapbox-gl'
import { type Polygon } from 'geojson'
import type { Observation } from './observation.interface'
import type { Ref } from 'vue'

export interface MapProps {
  mapCoordinates: LngLatLike
  markers?: LngLatLike[]
  polygons?: Polygon[]
  listenToInteraction?: boolean
  observationPopup: Ref<Observation | null>
}
