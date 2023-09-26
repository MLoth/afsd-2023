<template>
  <form @submit.prevent="handleResetPassword" class="w-full">
    <h1 class="text-4xl font-bold tracking-wider">Forgot password?</h1>
    <p class="text-neutral-500 mb-4">
      No worries, we'll email you a link to reset your password.
    </p>

    <div v-if="error">
      <p class="text-red-600">{{ error.message }}</p>
    </div>

    <div v-if="sendEmail">
      <div
        class="flex justify-between bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        <p class="">Email has been send.</p>

        <button @click="sendEmail = false">
          <X />
        </button>
      </div>
    </div>

    <div class="mt-6">
      <label
        for="email"
        class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
      >
        Email address
      </label>
      <input
        type="email"
        name="email"
        id="email"
        class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-50"
        v-model="email"
      />
    </div>

    <button
      class="mt-6 w-full rounded-md border-2 border-blue-500 bg-blue-500 py-2 px-4 font-semibold text-white hover:bg-blue-600 focus:outline-none focus-visible:border-blue-300 focus-visible:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-300"
    >
      Send password reset
    </button>
    <div class="flex justify-center">
      <RouterLink
        class="mt-3 inline-block rounded text-center text-sm text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
        to="/auth/login"
      >
        Remember? Go to login.
      </RouterLink>
    </div>
  </form>
</template>

<script lang="ts">
import { ref } from 'vue'
import { type AuthError } from 'firebase/auth'

import useFirebase from '@/composables/useFirebase'
import { X } from 'lucide-vue-next'

export default {
  components: { X },

  setup() {
    // Composables
    const { resetPassword } = useFirebase()
    const email = ref<string>('')
    const error = ref<AuthError | null>(null)
    const sendEmail = ref<boolean>(false)

    const handleResetPassword = () => {
      resetPassword(email.value).then(() => {
        // TODO: show notification
        sendEmail.value = true
      })
    }

    return {
      email,
      error,
      sendEmail,

      handleResetPassword,
    }
  },
}
</script>
