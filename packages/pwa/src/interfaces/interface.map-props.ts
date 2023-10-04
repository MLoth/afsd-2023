import { LngLatLike } from 'mapbox-gl'
import { type Polygon } from 'geojson'

export interface MapProps {
  mapCoordinates: LngLatLike
  markers?: LngLatLike[]
  polygons?: Polygon[]
}
