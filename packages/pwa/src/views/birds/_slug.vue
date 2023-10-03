<template>
  <Container>
    <!-- <h1 class="flex text-4xl font-bold tracking-wide mb-2 gap-3">
      {{ result.bird.name }}
    </h1>
    <p class="text-sm tracking-wide mb-2">
      {{ result.bird.category }}
    </p>

    <div class="flex flex-col-reverse lg:flex-row items-center gap-6">
      <div class="ml-auto">
        <p class="text-sm mb-6">{{ result.bird.observations }} times spotted</p>

        <p class="text-lg leading-relaxed lg:max-w-md">
          {{ result.bird.description }}
        </p>
      </div>

      <img
        class="max-w-xl w-full"
        :src="`/birds/${result.bird.name}.webp`"
        :alt="`Picture of ${result.bird.name}.`"
      />
    </div> -->
  </Container>
</template>

<script setup lang="ts">
// import { useQuery } from '@vue/apollo-composable'
// import { useRouter } from 'vue-router'

// import Container from '@/components/generic/Container.vue'
// import { GET_BIRD_BY_NAME } from '@/graphql/bird.query'

// const { currentRoute } = useRouter()
// const { slug } = currentRoute.value.params

// const { result, loading } = useQuery(GET_BIRD_BY_NAME, () => ({
//   name: slug,
// }))
// console.log(result)
</script>
