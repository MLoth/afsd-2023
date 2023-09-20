<template>
  <Container class="py-12"
    ><p class="text-xs">
      Created by
      <a
        class="underline focus:outline-none focus-visible:ring-4 ring-blue-400 rounded-md"
        href="https://mct.be/"
        >MCT</a
      >
      -
      {{ new Date().getFullYear() }}
    </p>
    <p class="text-xs text-neutral-400 mt-1">v{{ version }}</p></Container
  >
</template>

<script setup lang="ts">
import Container from './Container.vue'
import { version } from '../../../package.json'
</script>
