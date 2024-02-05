<script setup lang="ts">
import { type WeatherData } from "@/interfaces";

// Props
defineProps<{
  data: WeatherData;
}>();

function displayWeatherDescription(description: string) {

  // Make first letter uppercase
  let firstLetterUpperCase = description.charAt(0).toUpperCase();

  // New Description
  let newDescription = firstLetterUpperCase + description.slice(1);

  return newDescription;
}
</script>

<template>
  <!-- <code>{{ data }}</code> -->
  <div class="border-2 border-pink-500 rounded-md p-2 h-56">
    <h2 class="card-title justify-center">{{ data.dt_txt.split(' ')[1] }}</h2>
  
    <img
      :src="
        'https://openweathermap.org/img/wn/' + data.weather[0].icon + '.png'
      "
      alt="Weather image"
      class="mx-auto"
    />

    <div class="mb-3">
      <h3 class="card-title justify-center">{{ displayWeatherDescription(data.weather[0].description.split(' ')[0]) }} {{ data.weather[0].main }}</h3>
    </div>
  
  
    <div class="flex justify-center">
      <div class="text-center">
        <p>Min</p>
        <p class="text-xl">
          {{ data.main.temp_min }} &degC
        </p>
      </div>

      <div class="border border-blue-600 mx-3"></div>

      <div class="text-center">
        <p>Max</p>
        <p class="text-xl">
          {{ data.main.temp_max }} &degC
        </p>
      </div>
      
    </div>
  </div>

</template>
