<template>
  <Container>
    <h1 class="text-4xl font-bold tracking-wide mb-6">
      {{ $t('account.welcome', { user: firebaseUser?.displayName }) }}
    </h1>

    <form @submit.prevent="">
      <!-- <div class="flex">
        <div class="w-2/3">
          <img src="" alt="" />
        </div>

        <div class="w-1/3">
          <label class="block" for="name">Name</label>
          <input class="block w-full" type="text" id="name" />
        </div>
      </div> -->

      <label class="block" for="language">Select language</label>
      <select
        class="block mb-3"
        name="language"
        id="language"
        @change="setLanguage"
        :value="locale"
      >
        <option v-for="(value, key) in SUPPORTED_LOCALES" :value="key">
          {{ value }}
        </option>
      </select>

      <button
        @click="logoutUser"
        class="px-6 py-2 text-white bg-red-600 rounded-md focus:outline-none focus-visible:ring-4 ring-red-300 hover:bg-red-800"
      >
        {{ $t('account.log.out') }}
      </button>
    </form>
  </Container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import Container from '@/components/generic/Container.vue'
import useFirebase from '@/composables/useFirebase'
import { SUPPORTED_LOCALES } from '@/bootstrap/i18n'
import useLanguage from '@/composables/useLanguage'
import { useI18n } from 'vue-i18n'
import useCustomUser from '@/composables/useCustomUser'

const { firebaseUser, logout } = useFirebase()
const { replace } = useRouter()
const { setLocale } = useLanguage()
const { locale } = useI18n()
const { customUser } = useCustomUser()

firebaseUser.value?.getIdToken().then(token => {
  console.log(`{"Authorization": "Bearer ${token}"}`)
})

const logoutUser = () => {
  logout().then(() => {
    customUser.value = undefined
    replace({ path: '/' })
  })
}

const setLanguage = (event: Event) => {
  const target = event.target as HTMLSelectElement
  setLocale(target.value)
}
</script>
