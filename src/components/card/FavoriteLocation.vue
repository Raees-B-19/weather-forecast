<script setup lang="ts">
// emits
defineEmits(['getWeatherForecast', 'closeModal', 'removeFavoriteLocation'])

// props
defineProps<{
  country?: string
  locationName?: string
  lat?: number
  lon?: number
}>()
</script>

<template>
  <div class="card w-96 bg-base-100 shadow-xl mb-3">
    <div class="card-body">
      <h2 class="card-title">{{ locationName }}</h2>

      <p v-if="country">Country: {{ country }}</p>
      <p>Latutide: {{ lat }}</p>
      <p>Longitude: {{ lon }}</p>

      <div class="card-actions justify-start">
        <button type="button" class="btn btn-primary" @click="$emit('getWeatherForecast'); $emit('closeModal')">Get Weather</button>
        <button type="button" class="btn btn-error" @click="$emit('removeFavoriteLocation')">Remove</button>
      </div>
    </div>
  </div>
</template>
