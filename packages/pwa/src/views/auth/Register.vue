<template>
  <form @submit.prevent="handleRegister" class="w-full">
    <h1 class="text-4xl font-bold tracking-wider">Register</h1>
    <p class="text-neutral-500 mb-4">
      Create an account and keep track of your birds.
    </p>

    <div v-if="error">
      <p class="text-red-600">{{ error.message }}</p>
    </div>

    <div class="mt-6">
      <label
        for="nickname"
        class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
      >
        Name
      </label>
      <input
        type="text"
        name="nickname"
        id="nickname"
        class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:ring-2 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-50 focus-visible:border-blue-500 focus-visible:ring-blue-400"
      />
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
        v-model="newUser.email"
      />
    </div>

    <div class="mt-6">
      <label
        for="password"
        class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
      >
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        class="mt-1 block w-full rounded-md border-2 border-gray-300 p-2 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-50"
        v-model="newUser.password"
      />
    </div>

    <button
      :disabled="addUserLoading"
      class="mt-6 w-full rounded-md border-2 border-blue-500 bg-blue-500 py-2 px-4 font-semibold text-white hover:bg-blue-600 focus:outline-none focus-visible:border-blue-300 focus-visible:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-300 flex items-center justify-center disabled:bg-blue-200"
    >
      <template v-if="!addUserLoading">Register</template>
      <Loader2 v-else class="animate-spin" />
    </button>
    <div class="flex justify-center">
      <RouterLink
        class="mt-3 inline-block rounded text-center text-sm text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
        to="/auth/login"
      >
        Already have an account?
      </RouterLink>
    </div>
  </form>
</template>

<script lang="ts">
import { ref } from 'vue'
import { type AuthError } from 'firebase/auth'

import useFirebase from '@/composables/useFirebase'
import useCustomUser from '@/composables/useCustomUser'
import { useMutation } from '@vue/apollo-composable'
import { ADD_USER } from '@/graphql/user.mutation'
import { useI18n } from 'vue-i18n'
import type { CustomUser } from '@/interfaces/custom.user.interface'
import { Loader2 } from 'lucide-vue-next'

export default {
  setup() {
    // Composables
    const { register } = useFirebase()
    const { locale } = useI18n()
    const { customUser } = useCustomUser()

    const newUser = ref({
      name: '',
      password: '',
      email: '',
    })
    const error = ref<AuthError | null>(null)
    const {
      mutate: addUser,
      loading: addUserLoading,
      onDone: userCreated,
    } = useMutation<CustomUser>(ADD_USER)
    const handleRegister = () => {
      register(newUser.value.name, newUser.value.email, newUser.value.password)
        .then(() => {
          addUser({
            createUserInput: {
              locale: locale.value,
            },
          }).then(result => {
            if (!result?.data) throw new Error('Custom user creation failed.')

            customUser.value = result.data
          })
        })
        .catch(err => {
          error.value = err
        })
    }
    return {
      newUser,
      error,
      addUserLoading,
      handleRegister,
    }
  },
  components: { Loader2 },
}
</script>
