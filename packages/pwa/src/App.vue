<script lang="ts">
import { provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'

import AppFooter from './components/generic/AppFooter.vue'
import AppHeader from './components/generic/AppHeader.vue'

import useGraphql from './composables/useGraphql'
import useLanguage from './composables/useLanguage'
import { useI18n } from 'vue-i18n'
import useCustomUser from './composables/useCustomUser'
import { SUPPORTED_LOCALES } from './bootstrap/i18n'

export default {
  components: {
    AppFooter,
    AppHeader,
  },

  setup() {
    const { apolloClient } = useGraphql()
    const { setLocale } = useLanguage()
    const { locale } = useI18n()
    const { customUser } = useCustomUser()

    // Maak alles beschikbaar in de scope*
    provide(DefaultApolloClient, apolloClient)
    // * behalve in composables...

    if (customUser.value?.locale) {
      setLocale(customUser.value.locale)
    } else {
      setLocale(
        navigator.languages.find(locale =>
          Object.keys(SUPPORTED_LOCALES).includes(locale),
        ) ?? locale.value,
      )
    }

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
