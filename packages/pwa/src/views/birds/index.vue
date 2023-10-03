<template>
  <Container>
    <div class="flex w-full justify-between">
      <h1 class="text-4xl font-bold tracking-wide mb-6">Birds</h1>

      <div>
        <div class="relative">
          <Search
            class="absolute pointer-events-none h-5 ml-1 top-2 stroke-current text-neutral-500"
          />
          <input
            class="pl-8 focus:outline-none focus-visible:ring-4 ring-blue-400 rounded border-1 border-neutral-200 px-1 py-1"
            type="text"
            placeholder="Search bird"
            v-model="search"
          />
        </div>
      </div>
    </div>

    <div v-if="error">{{ error }}</div>

    <div v-if="loading">Loading...</div>

    <div v-else>
      <div
        class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 grid-rows-auto gap-12"
      >
        <template v-if="search.length > 0">
          <div
            v-if="searchBirds && searchBirds.findBirdsBySearchString.length > 0"
            v-for="bird of searchBirds.findBirdsBySearchString"
            :key="bird.id"
          >
            <div class="flex items-center gap-6">
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
          <div v-else>
            <p>No birds found for query.</p>
          </div>
        </template>
        <template v-else>
          <div v-for="bird of result.birds" :key="bird.id">
            <div class="flex items-center gap-6">
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
        </template>
      </div>
    </div>
  </Container>
</template>

<script lang="ts">
import Container from '@/components/generic/Container.vue'

import { useLazyQuery, useQuery } from '@vue/apollo-composable'
import { ALL_BIRDS, FIND_BIRDS_BY_SEARCH_STRING } from '@/graphql/bird.query'
import { ArrowRightIcon } from 'lucide-vue-next'
import { Search } from 'lucide-vue-next'
import { ref } from 'vue'
import { watch } from 'vue'

export default {
  components: { Container, ArrowRightIcon, Search },

  setup() {
    const search = ref('')

    const { result: defaultBirds, loading, error } = useQuery(ALL_BIRDS)
    const {
      document,
      result: searchBirds,
      load,
    } = useLazyQuery(FIND_BIRDS_BY_SEARCH_STRING, () => ({
      searchString: search.value,
    }))

    watch(search, () => {
      load(document.value, {
        searchString: search.value,
      })
    })

    return {
      result: defaultBirds,
      searchBirds,
      loading,
      error,
      search,
    }
  },
}
</script>
