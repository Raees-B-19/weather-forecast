<script setup lang="ts">
const apiKey = "c71a382e51b62d85bce7fe1e6db2810f";
const openWeatherMapUrl = "https://api.openweathermap.org";

async function getWeather() {
  let url = openWeatherMapUrl + "/data/2.5/forecast";

  // Add onto url
  url += "?lat=44.34&lon=10.99&appid=" + apiKey;

  // Make Fetch
  await fetch(url)
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}

let locationModel = defineModel("");

async function getGeographicalCoordinates() {
  let url = openWeatherMapUrl + "/geo/1.0/direct";
  let limit = 1;

  // Get locationModel value
  let location = `${locationModel.value}`;

  // Replace spaces with underscore
  location = location.replace(" ", "_");

  // Add onto url
  url += `?q=${location}&limit=${limit}&appid=${apiKey}`;

  // Make Fetch
  await fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}
</script>

<template>
  <div>
    <h2>Weather Forecast</h2>

    <form @submit.prevent="getGeographicalCoordinates">
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
  </div>
</template>
