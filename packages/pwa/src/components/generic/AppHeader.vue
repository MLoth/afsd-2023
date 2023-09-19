<template>
  <Container class="py-12"
    ><header class="flex items-center justify-between">
      <RouterLink
        class="flex items-center space-x-4 hover:opacity-30 focus:outline-none focus-visible:ring-4 ring-blue-400 rounded-lg"
        to="/"
      >
        <Logo class="h-10" />

        <span class="text-2xl tracking-wider font-bold">Birds</span>
      </RouterLink>

      <nav>
        <ul class="flex items-center space-x-12">
          <li>
            <RouterLink
              class="py-2 rounded-md focus:outline-none focus-visible:ring-4 ring-blue-400 font-semibold tracking-wide hover:opacity-40"
              active-class="opacity-30"
              to="/"
              >Home</RouterLink
            >
          </li>
          <li>
            <RouterLink
              class="py-2 rounded-md focus:outline-none focus-visible:ring-4 ring-blue-400 font-semibold tracking-wide hover:opacity-40"
              active-class="opacity-30"
              to="/birds"
              >Birds</RouterLink
            >
          </li>
          <li>
            <RouterLink
              class="py-2 rounded-md focus:outline-none focus-visible:ring-4 ring-blue-400 font-semibold tracking-wide hover:opacity-40"
              active-class="opacity-30"
              to="/observations"
              >Observations</RouterLink
            >
          </li>
          <li>
            <RouterLink
              class="block rounded-full focus:outline-none focus-visible:ring-4 ring-blue-400"
              :to="user ? `/account` : `/auth/login`"
            >
              <div
                v-if="user"
                class="rounded-full overflow-hidden h-10 w-10 object-fit hover:ring-4 ring-neutral-100"
              >
                <img
                  v-if="user.photoURL"
                  :src="user.photoURL"
                  alt="Profile picture"
                />
                <div
                  v-else
                  class="flex items-center justify-center bg-white h-full"
                >
                  <User2 class="h-8 object-cover" />
                </div>
              </div>
              <div v-else>
                <p>Login</p>
              </div>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </header></Container
  >
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User2 } from 'lucide-vue-next'

import Container from './Container.vue'
import Logo from './Logo.vue'

const user = ref<Object | null>(null)
</script>
