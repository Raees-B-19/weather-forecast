<script setup lang="ts">
async function getWeather() {
  let url = 'https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=';

  await fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch(error => console.error('Error:', error));
}

getWeather()
</script>

<template>
  <div>
    <h2>Weather Forecast</h2>

    <button v-on:click="getWeather">Get data</button>
  </div>
</template>
