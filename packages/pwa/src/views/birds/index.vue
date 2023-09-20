<template>
  <Container>
    <div class="flex w-full justify-between">
      <h1 class="text-4xl font-bold tracking-wide mb-6">Birds</h1>

      <div>Birds</div>
    </div>
  </Container>
</template>

<script lang="ts">
import Container from '@/components/generic/Container.vue'

import { ref, watch } from 'vue'

export default {
  components: { Container },

  setup() {
    return {}
  },
}
</script>
