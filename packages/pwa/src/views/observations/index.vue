<template>
  <Container>
    <h1 class="text-4xl font-bold tracking-wide mb-6">Observations</h1>

    <div v-if="error">
      {{ error }}
    </div>

    <div v-if="loading">
      <p>Observations are loading.</p>
    </div>
    <table v-if="result">
      <tr>
        <th>Location</th>
        <th>Bird name</th>
        <th>Time</th>
      </tr>
      <tr v-for="observation in result.observations">
        <td>{{ observation.location.name }}</td>
        <td>{{ observation.bird.name }}</td>
        <td>{{ observation.createdAt }}</td>
      </tr>
    </table>
  </Container>
</template>

<script setup lang="ts">
import Container from '@/components/generic/Container.vue'
import { useQuery } from '@vue/apollo-composable'

import { ALL_OBSERVATIONS } from '@/graphql/observation.query'

const { error, result, loading } = useQuery(ALL_OBSERVATIONS)
</script>
