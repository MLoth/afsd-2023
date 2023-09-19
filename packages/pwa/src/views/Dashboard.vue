<template>
  <div>
    <Container>
      <h1 class="text-4xl font-bold tracking-wide mb-6">Dashboard</h1>

      <div>
        <h2>Spotted today!</h2>
      </div>

      <div>
        <h2>Bird map</h2>
      </div>

      <div>
        <h2>Bird of the day</h2>
      </div>

      <Test />
    </Container>
  </div>
</template>

<script lang="ts">
import Container from '@/components/generic/Container.vue'

export default { components: { Container } }
</script>
