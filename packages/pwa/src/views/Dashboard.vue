<template>
  <div>
    <Container>
      <h1 class="text-4xl font-bold tracking-wide mb-6">Dashboard</h1>

      <div>
        <h2 class="text-2xl font-bold">Recent observations</h2>

        <MapView
          class="rounded-md"
          :map-coordinates="{ lat: 50, lon: 50 }"
          :listenToInteraction="false"
          :observationPopup="newObservation"
        />

        <div class="relative overflow-hidden -translate-y-1/2 pb-6">
          <div class="flex flex-nowrap gap-3 px-6">
            <div
              v-if="!loadingObservations"
              v-for="observation in observations.observations"
              class="bg-white px-3 py-1 rounded-lg"
            >
              <UseTimeAgo v-slot="{ timeAgo }" :time="observation.updatedAt">
                {{ timeAgo }}
              </UseTimeAgo>

              {{ observation.bird.name }}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2>Bird map</h2>
      </div>

      <div>
        <h2>Bird of the day</h2>
      </div>
    </Container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { UseTimeAgo } from '@vueuse/components'
import { useQuery } from '@vue/apollo-composable'

import Container from '@/components/generic/Container.vue'
import MapView from '@/components/generic/MapView.vue'
import useRealtime from '@/composables/useRealtime'
import { ALL_OBSERVATIONS } from '@/graphql/observation.query'
import type { Observation } from '@/interfaces/observation.interface'

const { result: observations, loading: loadingObservations } =
  useQuery(ALL_OBSERVATIONS)

const newObservation = ref<Observation | null>()

const { on } = useRealtime()

on('bird:observation', (observation: Observation) => {
  newObservation.value = observation
})
</script>
