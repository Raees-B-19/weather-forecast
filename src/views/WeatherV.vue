<script setup lang="ts">
import { useWeatherStore } from "@/stores/weather";

// Cards
import CardFavoriteLocation from "@/components/card/FavoriteLocation.vue";
import CardWeather from "@/components/card/Weather.vue";

// Icon
import IconSearch from "@/components/icons/SearchBar.vue";
import IconBookmark from "@/components/icons/Bookmark.vue";

// Modals
import ModalDocumentation from "@/components/modal/Documentation.vue";
import ModalError from "@/components/modal/Error.vue";

// Interfaces
import { type GeographicalCoordinates, type LocationData } from "@/interfaces";

const weatherStore = useWeatherStore();

let locationModel = defineModel("");

// Store
weatherStore.currentLocationData = {
  locationName: "",
  lat: 0,
  lon: 0,
};

weatherStore.displaySaveLocationButton = false;

// Get Weather
async function handleSubmit() {
  weatherStore.displaySaveLocationButton = false;

  // Error Dialog Modal
  let errorModal = document.getElementById("error-modal") as HTMLDialogElement;

  // Get Coordinates
  try {
    let coordinates: GeographicalCoordinates | null =
      await weatherStore.getGeographicalCoordinates(`${locationModel.value}`);

    // Check if lat or lon is ont null
    if (
      coordinates == null ||
      coordinates.lat == null ||
      coordinates.lat == null
    ) {
      console.error("Error with geographical coordinates");

      // Display error modal
      errorModal.showModal();

      return null;
    }

    // Get location data
    let currentLocationData: LocationData = {
      locationName: `${locationModel.value}`,
      lat: coordinates.lat,
      lon: coordinates.lon,
    };

    // Get weather forecast
    weatherStore.getWeatherForecast(coordinates.lat, coordinates.lon);

    // Update locationDataModel
    weatherStore.currentLocationData = currentLocationData;

    // If not in favorite locations
    if (!weatherStore.checkIfInFavoriteLocations()) {
      // Display save location button
      weatherStore.displaySaveLocationButton = true;
    }
  } catch (error) {
    console.error("Problem happened while getting weather forecast: ", error);

    // Display error modal
    errorModal.showModal();
  }
}

// Favorite Location
function handleSaveLoaction() {
  // Add to favorite lcoations
  weatherStore.addToFavoriteLoactions();

  weatherStore.displaySaveLocationButton = false;

  locationModel.value = "";
}
</script>

<template>
  <div class="grid sm:grid-cols-12 lg:grid-cols-12">
    <div class="sm:col-span-6 lg:col-span-6">
      <form @submit.prevent="handleSubmit">
        <div class="flex">
          <input
            type="text"
            id="locationInput"
            class="input input-bordered"
            minlength="1"
            placeholder="Search City"
            v-model.trim="locationModel"
            required
          />

          <button type="submit" class="btn btn-ghost btn-circle ml-1">
            <IconSearch />
          </button>

          <div v-if="weatherStore.displaySaveLocationButton">
            <div class="tooltip" data-tip="Favourite Location">
              <button
                type="button"
                class="btn btn-ghost btn-circle ml-1"
                @click="handleSaveLoaction"
              >
                <IconBookmark />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>

    <div class="mx-auto sm:col-span-6 lg:col-span-6">
      <div
        v-for="locationData in weatherStore.favoriteLocations"
        :key="locationData.locationName"
      >
        <CardFavoriteLocation
          :country="locationData.country"
          :locationName="locationData.locationName"
          :lat="locationData.lat"
          :lon="locationData.lon"
          @getWeatherForecast="
            weatherStore.getWeatherForecast(locationData.lat, locationData.lon)
          "
          @removeFavoriteLocation="
            weatherStore.removeFavoriteLocation(locationData.locationName)
          "
        />
      </div>
    </div>
  </div>

  <div v-if="weatherStore.currentWeatherData">
    <div v-for="dayWeatherData in weatherStore.currentWeatherData">

      <div class="grid grid-cols-5 gap-3">
        <div
          v-for="weatherData in dayWeatherData"
          :key="weatherData.dt"
        >
          <CardWeather :data="weatherData" />
        </div>
      </div>

    </div>
  </div>

  <div v-else class="mt-4">
    Please enter a location to get the Weather Forecast
  </div>

  <ModalDocumentation />

  <ModalError :locationName="`${locationModel}`" />
</template>
