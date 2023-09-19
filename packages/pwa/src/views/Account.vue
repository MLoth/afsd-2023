<template>
  <Container>
    <h1 class="text-4xl font-bold tracking-wide mb-6">
      Hi, {{ user?.displayName }}
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

      <button
        @click="logoutUser"
        class="px-6 py-2 text-white bg-red-600 rounded-md hover:bg-red-600 focus:outline-none focus-visible:ring-4 ring-red-300 hover:bg-red-800"
      >
        Log out
      </button>
    </form>
  </Container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import Container from '@/components/generic/Container.vue'
import useFirebase from '@/composables/useFirebase'

const { user, logout } = useFirebase()
const { replace } = useRouter()

user.value?.getIdToken().then(token => {
  console.log(`{"Authorization": "Bearer ${token}"}`)
})

const logoutUser = () => {
  logout().then(() => {
    replace({ path: '/' })
  })
}
</script>
