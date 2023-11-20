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

      <div>
        <h2 class="text-2xl font-bold">Welcome to our newest member!</h2>
        {{ userCreated?.newUserWasCreated?.content }}
        Welcome, {{ userCreated?.newUserWasCreated?.who }}
      </div>
    </Container>
  </div>
</template>

<script lang="ts" setup>
import Container from '@/components/generic/Container.vue'
import { useSubscription } from '@vue/apollo-composable'

import { USER_CREATED } from '@/graphql/user.subscription'
import { watch } from 'vue'

const { result: userCreated } = useSubscription(USER_CREATED)

watch(userCreated, (data: any) => {
  console.log('New message received:', data)
})
</script>
