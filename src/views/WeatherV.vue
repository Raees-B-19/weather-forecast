<script setup lang="ts">
import { useWeatherStore } from "@/stores/weather";
import FavoriteLocation from "@/components/card/FavoriteLocation.vue";

// Icon
import IconSearch from "@/components/icons/SearchBar.vue";
import IconStar from "@/components/icons/Star.vue";

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
            <button
              type="button"
              class="btn btn-ghost btn-circle ml-1"
              @click="handleSaveLoaction"
            >
              <IconStar />
            </button>
          </div>
        </div>
      </form>
    </div>

    <div class="mx-auto sm:col-span-6 lg:col-span-6">
      <div
        v-for="locationData in weatherStore.favoriteLocations"
        :key="locationData.locationName"
      >
        <FavoriteLocation
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

  <ModalDocumentation />

  <ModalError :locationName="`${locationModel}`" />
</template>
