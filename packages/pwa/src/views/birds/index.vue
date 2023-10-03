<template>
  <Container>
    <h1 class="text-4xl font-bold tracking-wide mb-6">Birds</h1>

    <div v-if="birdsLoading">Loading...</div>
    <div v-if="birdsError">
      {{ birdsError }}
    </div>

    <div
      v-if="birds"
      class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-12"
    >
      <div v-for="bird in birds.birds" class="flex items-center gap-6">
        <img
          class="w-48"
          :src="`/birds/${bird.name}.webp`"
          :alt="`Picture of ${bird.name}.`"
        />
        <div>
          <h2 class="text-lg font-semibold tracking-wide">
            {{ bird.name }}
          </h2>
          <p class="text-xs tracking-wide mb-2">{{ bird.category }}</p>
          <p class="text-sm">{{ bird.observations }} times spotted</p>

          <RouterLink
            class="flex items-center text-sm text-blue-600 hover:underline mt-2"
            :to="`/birds/${bird.name}`"
            >{{ bird.name }} <ArrowRightIcon class="h-4"
          /></RouterLink>
        </div>
      </div>
    </div>
  </Container>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import Container from '@/components/generic/Container.vue'
import { ALL_BIRDS } from '@/graphql/bird.query'

// TODO: refactor to interface
interface Bird {
  id: string
  name: string
  fullname: string
  category: string
  url: string
  observations: number
  description: string
  createdAt: Date
  updatedAt: Date
}

export default {
  components: { Container },

  setup() {
    const {
      loading: birdsLoading,
      result: birds,
      error: birdsError,
    } = useQuery(ALL_BIRDS)

    return {
      birdsLoading,
      birds: birds,
      birdsError,
    }
  },
}
</script>
@/graphql/bird.query
