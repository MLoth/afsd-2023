<template>
  <Container class="py-12">
    <header class="flex items-center justify-between">
      <RouterLink
        class="flex items-center space-x-4 hover:opacity-30 focus:outline-none focus-visible:ring-4 ring-blue-400 rounded-lg"
        to="/"
      >
        <Logo class="h-10" />

        <span class="text-2xl tracking-wider font-bold">{{
          $t('navigation.birds')
        }}</span>
      </RouterLink>

      <nav>
        <ul class="flex items-center space-x-12">
          <li>
            <RouterLink
              class="py-2 rounded-md focus:outline-none focus-visible:ring-4 ring-blue-400 font-semibold tracking-wide hover:opacity-40"
              active-class="opacity-30"
              to="/"
            >
              {{ $t('navigation.home') }}
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="py-2 rounded-md focus:outline-none focus-visible:ring-4 ring-blue-400 font-semibold tracking-wide hover:opacity-40"
              active-class="opacity-30"
              to="/birds"
            >
              {{ $t('navigation.birds') }}
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="py-2 rounded-md focus:outline-none focus-visible:ring-4 ring-blue-400 font-semibold tracking-wide hover:opacity-40"
              active-class="opacity-30"
              to="/observations"
            >
              {{ $t('navigation.observations') }}
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="block rounded-full focus:outline-none focus-visible:ring-4 ring-blue-400 hover:bg-neutral-100 py-2 px-3"
              :to="firebaseUser ? `/account` : `/auth/login`"
            >
              <div v-if="firebaseUser" class="flex items-center gap-3">
                <img
                  v-if="firebaseUser.photoURL"
                  :src="firebaseUser.photoURL"
                  alt="Profile picture"
                />
                <div
                  v-else
                  class="rounded-full overflow-hidden h-10 w-10 object-fit ring-neutral-100 flex items-center justify-center bg-white"
                >
                  <User2 class="h-8 object-cover" />
                </div>

                <p class="pr-1">
                  {{ firebaseUser.displayName }}
                </p>
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
import { User2 } from 'lucide-vue-next'

import useFirebase from '@/composables/useFirebase'

import Container from './Container.vue'
import Logo from './Logo.vue'
import useCustomUser from '@/composables/useCustomUser'

const { firebaseUser } = useFirebase()
const { customUser } = useCustomUser()
</script>
