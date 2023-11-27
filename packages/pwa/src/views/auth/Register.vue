<template>
  <form @submit.prevent="handleRegister" class="w-full">
    <h1 class="text-4xl font-bold tracking-wider">
      {{ $t('title.register') }}
    </h1>
    <p class="text-neutral-500 mb-4">
      {{ $t('subtitle.register') }}
    </p>

    <div v-if="error">
      <p class="text-red-600">{{ error.message }}</p>
    </div>

    <div class="mt-6">
      <label
        for="nickname"
        class="text-md block font-semibold tracking-wider text-gray-700 dark:text-gray-200"
      >
        {{ $t('label.first.name') }} {{ $t('label.last.name') }}
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
        {{ $t('label.email.short') }}
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
        {{ $t('label.password') }}
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
      <template v-if="!addUserLoading">{{ $t('label.register') }}</template>
      <Loader2 v-else class="animate-spin" />
    </button>
    <div class="flex justify-center">
      <RouterLink
        class="mt-3 inline-block rounded text-center text-sm text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
        to="/auth/login"
      >
        {{ $t('label.has.account') }}
      </RouterLink>
    </div>
  </form>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { Loader2 } from 'lucide-vue-next'

import { type AuthError } from 'firebase/auth'
import { useMutation } from '@vue/apollo-composable'

import useFirebase from '@/composables/useFirebase'
import useCustomUser from '@/composables/useCustomUser'
import { ADD_USER } from '@/graphql/user.mutation'

export default {
  setup() {
    // Composables
    const { register } = useFirebase()
    const { locale } = useI18n()
    const { customUser } = useCustomUser()
    const { replace } = useRouter()

    const newUser = ref({
      name: '',
      password: '',
      email: '',
    })
    const error = ref<AuthError | null>(null)

    const { mutate: addUser, loading: addUserLoading } = useMutation(ADD_USER)

    const handleRegister = () => {
      register(newUser.value.name, newUser.value.email, newUser.value.password)
        .then(user => {
          console.log('Got', user)

          addUser({
            createUserInput: {
              locale: locale.value,
            },
          }).then(result => {
            if (!result?.data) throw new Error('Custom user creation failed.')

            customUser.value = result.data.createUser
            console.log('Custom user', customUser.value)

            replace('/')
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
