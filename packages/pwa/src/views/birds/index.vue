<template>
  <Container>
    <h1 class="text-4xl font-bold tracking-wide mb-6">Birds</h1>

    <p>Birds</p>

    <div v-if="birdsLoading">Loading...</div>
    <div v-if="birdsError">
      {{ birdsError }}
    </div>
    <div v-if="birds">
      <ul>
        <li v-for="bird in birds.birds">
          {{ bird.name }}
        </li>
      </ul>
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
