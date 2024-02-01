<script setup lang="ts">
import { useWeatherStore } from "@/stores/weather";
import FavoriteLocation from "@/components/card/FavoriteLocation.vue";
import ModalDocumentation from "@/components/modal/Documentation.vue";
import IconDocumentation from "@/components/icons/IconDocumentation.vue";

// Interfaces
import { type GeographicalCoordinates, type LocationData } from "@/interfaces";

const weatherStore = useWeatherStore();

let locationModel = defineModel("");

let currentLocationName = "";

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
      currentLocationName = `${locationModel.value}`;

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

function handleShowDocumentationModal() {
  let documentationModal = document.getElementById("documentation-modal") as HTMLDialogElement;

  // Show the documentation modal
  documentationModal.showModal();
}
</script>

<template>
  <div>
    <div @click="handleShowDocumentationModal">
      <IconDocumentation />
    </div>

    <ModalDocumentation />

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
              weatherStore.getWeatherForecast(
                locationData.lat,
                locationData.lon
              )
            "
            @removeFavoriteLocation="
              weatherStore.removeFavoriteLocation(locationData.locationName)
            "
          />
        </div>
      </div>
    </div>

    <!-- Error Dialog -->
    <dialog id="error-modal" class="modal">
      <div class="modal-box border-2 border-rose-500">
        <h3 class="font-bold text-lg text-rose-300 mb-3">Error</h3>

        <p class="mb-3">
          Unable to get weather forecast for {{ locationModel }}
        </p>

        <p>
          Please enter a known location
          <span class="font-bold">e.g Cape Townc</span>
        </p>

        <p class="py-3">Press ESC key or click outside to close</p>
      </div>

      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>
