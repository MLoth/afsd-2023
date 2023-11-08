<template>
  <div class="my-3 min-h-[600px]" ref="mapElement"></div>
</template>

<script lang="ts">
import 'mapbox-gl/dist/mapbox-gl.css'

import { type LngLatLike } from 'mapbox-gl'
import { onMounted, ref, watch, type Ref } from 'vue'
import { type Polygon } from 'geojson'

import useMapbox from '../../composables/useMapbox'
import type { Observation } from '@/interfaces/observation.interface'

export default {
  props: {
    mapCoordinates: {
      type: Object as () => LngLatLike,
      required: true,
    },
    markers: {
      type: Array as () => LngLatLike[],
      required: false,
      default: () => [],
    },
    polygons: {
      type: Array as () => Polygon[],
      required: false,
      default: () => [],
    },
    listenToInteraction: {
      type: Boolean,
      required: false,
      default: true,
    },
    observationPopup: {
      type: Object as () => Ref<Observation | null>,
      required: false,
      default: null,
    },
  },

  setup(props, { emit }) {
    const {
      createMap,
      renderMarkerIfAny,
      renderPolygonsIfAny,
      listenToInteraction,
      removeMapData,
    } = useMapbox(props)

    const mapElement = ref<HTMLElement | null>(null)

    // DOM Content Loaded
    onMounted(() => {
      const map = createMap(mapElement.value!)

      // This can help.
      map.on('load', () => {
        renderMarkerIfAny()
        renderPolygonsIfAny()
        if (props.listenToInteraction)
          listenToInteraction(emit, 'coordinateSelection')
      })

      // When props change, update the map data each time
      watch(props, async () => {
        await removeMapData()
        renderMarkerIfAny()
        renderPolygonsIfAny()
      })
    })

    return {
      mapElement,
    }
  },
}
</script>
