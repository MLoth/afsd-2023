<template>
  <form @submit.prevent="handleLogin" class="w-full">
    <h1 class="text-4xl font-bold tracking-wider">{{ $t('title.login') }}</h1>
    <p class="text-neutral-500 mb-4">
      {{ $t('subtitle.login') }}
    </p>

    <div v-if="error">
      <p class="text-red-600">{{ error.message }}</p>
    </div>

    <div class="mt-6">
      <label
        for="email"
        class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
      >
        {{ $t('label.email.short') }}
      </label>
      <input
        type="email"
        name="email"
        id="email"
        class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-50"
        v-model="loginCredentials.email"
      />
    </div>
    <div class="mt-6">
      <label
        for="password"
        class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
      >
        {{ $t('label.password') }}
      </label>
      <input
        type="password"
        name="password"
        id="password"
        class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-50"
        v-model="loginCredentials.password"
      />
      <RouterLink
        to="/auth/forgot-password"
        class="mt-1 inline-block rounded text-sm text-blue-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 dark:text-blue-200"
      >
        {{ $t('label.forgot.login.details') }}
      </RouterLink>
    </div>

    <button
      class="mt-6 w-full rounded-md border-2 border-blue-500 bg-blue-500 py-2 px-4 font-semibold text-white hover:bg-blue-600 focus:outline-none focus-visible:border-blue-300 focus-visible:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-300"
    >
      {{ $t('title.login') }}
    </button>
    <div class="flex justify-center">
      <RouterLink
        class="mt-3 inline-block rounded text-center text-sm text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
        to="/auth/register"
      >
        {{ $t('subtitle.register') }}
      </RouterLink>
    </div>
  </form>
</template>

<script lang="ts">
import { ref } from 'vue'
import { type AuthError } from 'firebase/auth'

import useFirebase from '@/composables/useFirebase'
import { useRouter } from 'vue-router'
import useCustomUser from '@/composables/useCustomUser'

export default {
  setup() {
    // Composables
    const { login, firebaseUser } = useFirebase()
    const { replace } = useRouter()
    const { restoreCustomUser } = useCustomUser()

    // Logic
    const loginCredentials = ref({
      email: 'martijn.loth@howest.be',
      password: '',
    })
    const error = ref<AuthError | null>(null)

    const handleLogin = () => {
      login(loginCredentials.value.email, loginCredentials.value.password)
        .then(() => {
          restoreCustomUser().then(() => {
            replace('/')
          })
        })
        .catch((err: AuthError) => {
          error.value = err
        })
    }

    return {
      loginCredentials,
      firebaseUser,

      error,
      handleLogin,
    }
  },
}
</script>
