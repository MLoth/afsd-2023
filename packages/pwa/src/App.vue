<script lang="ts">
import { provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'

import AppFooter from './components/generic/AppFooter.vue'
import AppHeader from './components/generic/AppHeader.vue'

import useGraphql from './composables/useGraphql'

export default {
  components: {
    AppFooter,
    AppHeader,
  },

  setup() {
    const { apolloClient } = useGraphql()

    // Maak alles beschikbaar in de scope*
    provide(DefaultApolloClient, apolloClient)
    // * behalve in composables...

    return {}
  },
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />

    <RouterView class="flex-1" />

    <AppFooter />
  </div>
</template>
