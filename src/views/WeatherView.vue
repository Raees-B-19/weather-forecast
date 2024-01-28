<script setup lang="ts">
// Store
import { useWeatherStore } from '@/stores/weather';

const weatherStore = useWeatherStore();

const apiKey = "c71a382e51b62d85bce7fe1e6db2810f";
const openWeatherMapUrl = "https://api.openweathermap.org";

let locationModel = defineModel("");

interface GeographicalCoordinates {
  lat: number;
  lon: number;
}

// Get Weather
async function getWeather() {
  let coordinates: GeographicalCoordinates = await getGeographicalCoordinates();

  let url = openWeatherMapUrl + "/data/2.5/forecast";

  // Add coordinates to url
  url += `?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`;

  // Make Fetch
  await fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}

// Get Coordinates
async function getGeographicalCoordinates(): Promise<GeographicalCoordinates> {
  let url = openWeatherMapUrl + "/geo/1.0/direct";
  let limit = 1;

  // Get locationModel value
  let location = `${locationModel.value}`;

  // Replace spaces with underscore
  location = location.replace(" ", "_");

  // Add onto url
  url += `?q=${location}&limit=${limit}&appid=${apiKey}`;

  // Make Fetch
  let response = await fetch(url);

  // Check if ok
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  // Get json response
  let data = await response.json();

  // Get coordinates
  let coordinates: GeographicalCoordinates = {
    lat: data[0].lat,
    lon: data[0].lon,
  };

  return coordinates;
}

// Favorite Location
function saveLocation() {
  // Add to favorite lcoations
  weatherStore.favoriteLocations.push(`${locationModel.value}`)
}
</script>

<template>
  <div>
    <h2>Weather Forecast</h2>

    <form @submit.prevent="getWeather">
      <div>
        <label for="locationInput" class="block">Location</label>
        <input
          type="text"
          id="locationInput"
          minlength="1"
          placeholder="Location"
          v-model.trim="locationModel"
          required
        />
      </div>

      <button type="submit" class="btn btn-success">Get data</button>
    </form>

    <button type="button" class="btn btn-primary" @click="saveLocation">Save Location</button>
  </div>
</template>
