<script setup lang="ts">
import { type WeatherData } from "@/interfaces";

// Props
defineProps<{
  data: WeatherData;
}>();
</script>

<template>
  <!-- <code>{{ data }}</code> -->

  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">{{ data.dt_txt }}</h2>

      <img
        :src="
          'https://openweathermap.org/img/wn/' + data.weather[0].icon + '.png'
        "
      />

      <h2 class="card-title">{{ data.weather[0].main }}</h2>

      <p>{{ (data.weather[0].description) }}</p>

      <p>Min: {{ data.main.temp_min }}</p>
      <p>Max: {{ data.main.temp_max }}</p>

      <div class="card-actions justify-end"></div>
    </div>
  </div>
</template>
