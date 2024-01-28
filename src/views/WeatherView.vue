<script setup lang="ts">
// Store
import { useWeatherStore } from "@/stores/weather";
import FavoriteLocationCard from "@/components/FavoriteLocationCard.vue";

// Interfaces
import { type GeographicalCoordinates, type LocationData } from "@/interfaces";

const weatherStore = useWeatherStore();

let locationModel = defineModel("");

let currentLocationName = "";

weatherStore.currentLocationData = {};

weatherStore.displaySaveLocationButton = false;

// Get Weather
async function handleSubmit() {
  weatherStore.displaySaveLocationButton = false;
  
  // Get Coordinates
  let coordinates: GeographicalCoordinates =
    await weatherStore.getGeographicalCoordinates(`${locationModel.value}`);

  // Get location data
  let currentLocationData: LocationData = {
    locationName: `${locationModel.value}`,
    lat: coordinates.lat,
    lon: coordinates.lon,
  };

  // Get weather forecast
  weatherStore.getWeatherForecast(coordinates.lat, coordinates.lon)

  // Update locationDataModel
  weatherStore.currentLocationData = currentLocationData;

  // If not in favorite locations
  if (!weatherStore.checkIfInFavoriteLocations()) {
    // Display save location button
    currentLocationName = `${locationModel.value}`;
  
    weatherStore.displaySaveLocationButton = true;
  }
}

// Favorite Location
function handleSaveLoaction() {
  // Add to favorite lcoations
  weatherStore.addToFavoriteLoactions();

  weatherStore.displaySaveLocationButton = false;

  locationModel.value = ""
}
</script>

<template>
  <div>
    <div class="grid lg:grid-cols-12 sm:grid-cols-12">
      <!-- Your content goes here -->
      <div class="mx-auto lg:col-span-6 sm:col-span-6">
        <form @submit.prevent="handleSubmit">
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

        <div v-if="weatherStore.displaySaveLocationButton">
          <button
            type="button"
            class="btn btn-primary"
            @click="handleSaveLoaction"
          >
            Save Location {{ currentLocationName }}
          </button>
        </div>
      </div>

      <div class="mx-auto lg:col-span-6 sm:col-span-6">
        <div v-for="locationData in weatherStore.favoriteLocations">
          <FavoriteLocationCard
            :locationName="locationData.locationName"
            :lat="locationData.lat"
            :lon="locationData.lon"
            @getWeatherForecast="weatherStore.getWeatherForecast(locationData.lat, locationData.lon)"
            @removeFavoriteLocation="weatherStore.removeFavoriteLocation(locationData.locationName)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
