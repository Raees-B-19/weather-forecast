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
  <div class="border-2 border-info/70 rounded-md p-2 h-56">
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
        <div class="border border-info/50"></div>
        
        <div class="mr-2 mt-1">
          <p class="font-medium">Min</p>
          <p class="text-xl">
            {{ data.main.temp_min }} &degC
          </p>
        </div>
      </div>
      
      <div class="border border-info/50"></div>
      
      <div class="text-center">
        <div class="border border-info/50"></div>
        
        <div class="ml-2 mt-1">
          <p class="font-medium">Max</p>
          <p class="text-xl">
            {{ data.main.temp_max }} &degC
          </p>
        </div>
      </div>
      
    </div>
  </div>

</template>
