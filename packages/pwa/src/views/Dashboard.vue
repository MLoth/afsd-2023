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

        <div class="relative z-10 overflow-hidden -translate-y-1/2 pb-6">
          <div class="flex flex-nowrap gap-3 px-6 overflow-x-auto">
            <div
              v-if="!loadingObservations"
              v-for="observation in [
                ...liveObservations,
                ...observations.observations,
              ]"
              class="bg-white px-3 py-1 rounded-lg w-auto flex-shrink-0 shadow mb-4"
              @click="() => focusMap(observation)"
              :key="observation.id"
            >
              <span class="text-xs text-neutral-500">
                <UseTimeAgo
                  v-slot="{ timeAgo }"
                  :time="observation.updatedAt"
                  :show-second="true"
                >
                  {{ timeAgo }}
                </UseTimeAgo>
              </span>

              <div class="flex items-center">
                <img
                  class="h-12"
                  :src="`/birds/${observation.bird.name}.webp`"
                  :alt="`Picture of ${observation.bird.name}`"
                />

                <p>{{ observation.bird.name }}</p>
              </div>
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
const liveObservations = ref<Observation[]>([])

const { on } = useRealtime()

on('bird:observation', (data: Partial<Observation>) => {
  console.log('New observation', data)

  newObservation.value = data as Observation
  liveObservations.value.push(data as Observation)
})

const focusMap = (observation: Observation) => {
  console.log('Focus map', observation)
  newObservation.value = observation
}
</script>
