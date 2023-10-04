<template>
  <Container>
    <h1 class="text-4xl font-bold tracking-wide mb-6">Add observation</h1>

    <form @submit.prevent="handleNewObservation">
      <label
        class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
        for="birdId"
      >
        Bird
        <select
          v-model="observationInput.birdId"
          v-if="!inputLoading"
          class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-50 mb-3"
          name="birdId"
          id="birdId"
        >
          <option value="pick-a-bird" disabled>What bird did you see?</option>
          <option v-for="bird of input.birds" :value="bird.id">
            {{ bird.name }}
          </option>
        </select>
      </label>

      <label
        class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
        for="locationId"
      >
        Location
        <select
          v-if="!inputLoading"
          v-model="observationInput.locationId"
          class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-50 mb-3"
          name="locationId"
          id="locationId"
        >
          <option value="pick-a-location">Where did you see it?</option>
          <option v-for="location of input.locations" :value="location.id">
            {{ location.name }}
          </option>
        </select>
      </label>

      <label
        class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
        for=""
      >
        Point
      </label>
      <MapView
        v-if="input"
        class="rounded-md"
        :mapCoordinates="{ lng: 50.236, lat: 5.321523 }"
        :polygons="areas"
        @coordinateSelection="handleCoordinateSelection"
      />

      <label
        class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
        for="description"
      >
        Description
        <textarea
          v-model="observationInput.description"
          class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-50 mb-3"
          name=""
          id="description"
          rows="10"
        ></textarea>
      </label>

      <button
        class="flex items-center gap-3 ml-auto rounded-md border-2 border-blue-500 bg-blue-500 py-2 px-4 font-semibold text-white hover:bg-blue-600 focus:outline-none focus-visible:border-blue-300 focus-visible:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-300"
      >
        Add observation
      </button>
    </form>
  </Container>
</template>

<script lang="ts">
import Container from '@/components/generic/Container.vue'
import { useMutation, useQuery } from '@vue/apollo-composable'

import { OBSERVATION_INPUT } from '@/graphql/observation.query'
import { ADD_OBSERVATION } from '@/graphql/observation.mutation'
import { ref, watch } from 'vue'
import useFirebase from '@/composables/useFirebase'
import MapView from '@/components/generic/MapView.vue'

import { type Polygon } from 'geojson'
import { useRouter } from 'vue-router'

export default {
  components: {
    Container,
    MapView,
  },

  setup() {
    const { result: input, loading: inputLoading } = useQuery(OBSERVATION_INPUT)
    const { mutate: addObservation } = useMutation(ADD_OBSERVATION)
    const { firebaseUser } = useFirebase()
    const { push } = useRouter()

    const areas = ref<Polygon[]>([])

    const observationInput = ref({
      userUid: firebaseUser.value?.uid,
      birdId: 'pick-a-bird',
      locationId: 'pick-a-location',
      description: '',
      geolocation: {
        type: 'Point',
        coordinates: [0, 0],
      },
    })

    const handleNewObservation = () => {
      addObservation({
        observationInput: observationInput.value,
      }).then(() => {
        push('/observations')
      })
    }

    const handleCoordinateSelection = (coordinates: {
      lng: number
      lat: number
    }) => {
      observationInput.value.geolocation.coordinates = [
        coordinates.lng,
        coordinates.lat,
      ]
    }

    watch(input, () => {
      areas.value = input.value.locations.map((location: any) => location.area)
    })

    return {
      observationInput,
      input,
      inputLoading,
      areas,

      handleNewObservation,
      handleCoordinateSelection,
    }
  },
}
</script>
