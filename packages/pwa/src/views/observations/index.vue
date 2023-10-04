<template>
  <Container>
    <div class="flex w-full justify-between">
      <h1 class="text-4xl font-bold tracking-wide mb-6">Observations</h1>

      <div>
        <RouterLink
          to="observations/add"
          class="flex items-center gap-3 w-full rounded-md border-2 border-blue-500 bg-blue-500 py-2 px-4 font-semibold text-white hover:bg-blue-600 focus:outline-none focus-visible:border-blue-300 focus-visible:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-300"
        >
          <Plus class="stroke-current" />
          Add observation
        </RouterLink>
      </div>
    </div>

    <div v-if="error">
      {{ error }}
    </div>

    <div v-if="loading">
      <p>Observations are loading.</p>
    </div>
    <table class="w-full" v-if="result">
      <tr class="text-left">
        <th>Location</th>
        <th>Bird</th>
        <th>Time</th>
      </tr>
      <tr v-for="observation in result.observations">
        <td class="py-3">{{ observation.location.name }}</td>
        <td class="py-3">
          <RouterLink
            :to="`/birds/${observation.bird.name}`"
            class="flex items-center gap-x-6 font-semibold"
          >
            <img
              class="max-w-16"
              :src="`/birds/${observation.bird.name}.webp`"
              :alt="`Picture of ${observation.bird.name}.`"
            />
            {{ observation.bird.name }}
          </RouterLink>
        </td>
        <td class="py-3">{{ observation.createdAt }}</td>
      </tr>
    </table>
  </Container>
</template>

<script setup lang="ts">
import Container from '@/components/generic/Container.vue'
import { useQuery } from '@vue/apollo-composable'

import { ALL_OBSERVATIONS } from '@/graphql/observation.query'
import { Plus } from 'lucide-vue-next'

const { error, result, loading, refetch } = useQuery(ALL_OBSERVATIONS)
</script>
