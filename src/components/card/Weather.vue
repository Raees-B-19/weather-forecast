<script setup lang="ts">
import { type WeatherData } from "@/interfaces";

// Icon
import IconArrow from "@/components/icons/Arrow.vue";

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
  <div class="border-2 border-info/60 rounded-md p-2 min-h-50 max-h-96">
    <div class="grid gap-3 grid-cols-1 lg:grid-cols-2">
      <!-- Top section -->
      <div>
        <div class="mb-3">
          <!-- Time -->
          <h2 class="card-title justify-center">
            {{ data.dt_txt.split(" ")[1] }}
          </h2>

          <!-- Icon -->
          <img
            :src="
              'https://openweathermap.org/img/wn/' +
              data.weather[0].icon +
              '.png'
            "
            alt="Weather image"
            class="mx-auto"
          />

          <!-- Description if -->
          <h3 v-if="displayWeatherDescription(
            data.weather[0].description.split(' ')[0]
            ).toUpperCase() === data.weather[0].main.toUpperCase()" class="text-center text-lg font-bold">
            {{
              displayWeatherDescription(
                data.weather[0].description
              )
            }}
          </h3>

          <!-- Description else -->
          <h3 v-else class="text-center text-lg font-bold">
            {{
              displayWeatherDescription(
                data.weather[0].description.split(" ")[0]
              )
            }}
            {{ data.weather[0].main }}
          </h3>
        </div>

        <!-- Min / Max celsius -->
        <div class="flex justify-center">
          <!-- Min -->
          <div class="text-center">
            <div class="border border-info/50"></div>

            <div class="mr-2 mt-1">
              <p class="font-medium">Min</p>
              <p class="text-lg lg:text-md">
                {{ data.main.temp_min.toFixed(1) }} &degC
              </p>
            </div>
          </div>

          <div class="border border-info/50"></div>

          <!-- Max -->
          <div class="text-center">
            <div class="border border-info/50"></div>

            <div class="ml-2 mt-1">
              <p class="font-medium">Max</p>
              <p class="text-lg lg:text-md">
                {{ data.main.temp_max.toFixed(1) }} &degC
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bootom section -->
      <div class="flex items-end mx-auto lg:items-center">
        <div class="text-center lg:text-left">
          <p class="text-md pt-1">Humidity: {{ data.main.humidity }}%</p>

          <p class="text-md my-1">Wind Speed: {{ data.wind.speed }} m/sec</p>

          <p class="text-md">
            Wind Degrees: {{ data.wind.deg }} &deg
            <IconArrow class="inline-block" :degRotation="data.wind.deg" />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
