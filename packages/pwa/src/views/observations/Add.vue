<template>
  <Container>
    <h1 class="text-4xl font-bold tracking-wide mb-6">Observations</h1>

    <form @submit.prevent="handleNewObservation">
      <label class="block" for="birdId">
        Bird
        <select
          v-model="observationInput.birdId"
          v-if="!inputLoading"
          class="block"
          name="birdId"
          id="birdId"
        >
          <option value="pick-a-bird" disabled>What bird did you see?</option>
          <option v-for="bird of input.birds" :value="bird.id">
            {{ bird.name }}
          </option>
        </select>
      </label>

      <label class="block" for="locationId">
        Location
        <select
          v-if="!inputLoading"
          v-model="observationInput.locationId"
          class="block"
          name="birdId"
          id="locationId"
        >
          <option value="pick-a-location">Where did you see it?</option>
          <option v-for="location of input.locations" :value="location.id">
            {{ location.name }}
          </option>
        </select>
      </label>

      <label class="block" for="description">
        Description
        <textarea
          v-model="observationInput.description"
          class="block w-full"
          name=""
          id="description"
          rows="10"
        ></textarea>
      </label>

      <label class="block" for="">
        Point
        <div class="grid grid-cols-2 gap-3">
          <input
            v-model="observationInput.geolocation.coordinates[0]"
            class=""
            type="number"
            name=""
            id=""
          />
          <input
            v-model="observationInput.geolocation.coordinates[1]"
            class=""
            type="number"
            name=""
            id=""
          />
        </div>
      </label>
      <button>Add observation</button>
    </form>
  </Container>
</template>

<script lang="ts">
import Container from '@/components/generic/Container.vue'
import { useMutation, useQuery } from '@vue/apollo-composable'

import { OBSERVATION_INPUT } from '@/graphql/observation.query'
import { ADD_OBSERVATION } from '@/graphql/observation.mutation'
import { ref } from 'vue'
import useFirebase from '@/composables/useFirebase'

export default {
  components: {
    Container,
  },

  setup() {
    const { result: input, loading: inputLoading } = useQuery(OBSERVATION_INPUT)
    const { mutate: addObservation } = useMutation(ADD_OBSERVATION)
    const { firebaseUser } = useFirebase()

    const observationInput = ref({
      userUid: firebaseUser.value?.uid,
      birdId: 'pick-a-bird',
      locationId: 'pick-a-location',
      description: '',
      geolocation: {
        type: 'Point',
        coordinates: [0, 0],
      },
    })

    const handleNewObservation = () => {
      // TODO: check input values
      console.log(observationInput.value)
      addObservation({
        observationInput: observationInput.value,
      })
    }

    return {
      observationInput,
      input,
      inputLoading,

      handleNewObservation,
    }
  },
}
</script>
