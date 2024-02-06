<script setup lang="ts">
import { useWeatherStore } from "@/stores/weather";

// navbar
import Navbar from "@/components/Navbar.vue";

// Card
import CardWeather from "@/components/card/Weather.vue";

// Icon
import IconSearch from "@/components/icons/SearchBar.vue";
import IconBookmark from "@/components/icons/Bookmark.vue";

// Modals
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

  // Make favourite loaction button not display
  weatherStore.displaySaveLocationButton = false;
}

// Months
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Days of the week
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Convert date to words
function getDateInWordFormat(weatherDate: string) {
  let currentDate = new Date(weatherDate);

  // Get month
  let currentDateMonth = months[currentDate.getMonth()];

  // Get day
  let currentDateDayOfWeek = daysOfWeek[currentDate.getDay()];

  // Monday Feb 2024
  return `${currentDateDayOfWeek} ${currentDateMonth} ${currentDate.getFullYear()}`;
}
</script>

<template>
  <Navbar />

  <hr class="border border-white/40" />

  <div class="grid my-4 sm:grid-cols-12 lg:grid-cols-12">
    <div class="col-span-12">
      <!-- Search location form -->
      <form @submit.prevent="handleSubmit">
        <div class="flex justify-center">
          <input
            type="text"
            id="locationInput"
            class="input text-white/90 border-2 border-white/60 md:w-2/5"
            minlength="1"
            placeholder="Search a location"
            v-model.trim="locationModel"
            required
          />

          <button type="submit" aria-label="Search Icon Button" class="btn btn-ghost btn-circle ml-1">
            <IconSearch />
          </button>
        </div>
      </form>

      <!-- Save location button if -->
      <div
        v-if="weatherStore.displaySaveLocationButton"
        class="mx-auto mb-3 w-fit mt-3"
      >
        <button
          type="button"
          id="favouriteLocationButton"
          class="btn btn-success bg-transparent text-white/70 hover:text-white/90"
          aria-label="Favourite Location"
          @click="handleSaveLoaction"
        >
          Favourite Location <IconBookmark />
        </button>
      </div>
    </div>
  </div>

  <!-- Weather forecast if -->
  <div v-if="Object.keys(weatherStore.currentWeatherData).length > 0">
    <hr class="border border-white/40 mb-4" />

    <!-- Current location name -->
    <p class="text-left text-2xl font-medium mb-4">
      {{ weatherStore.currentLocationData.locationName }}
    </p>

    <!-- Current weather data loop -->
    <div v-for="(dayWeatherData, index) in weatherStore.currentWeatherData">
      <div class="collapse collapse-arrow bg-base-200 mb-2">
        
        <!-- Collapse Open if -->
        <input v-if="index === 0" type="checkbox" checked />
        <!-- Collapse Open else -->
        <input v-else type="checkbox" />
        
        <!-- Weather date -->
        <div class="collapse-title text-xl font-medium">
          {{ getDateInWordFormat(dayWeatherData[index].dt_txt.split(" ")[0]) }} <span v-if="index === 0">- Today</span>
        </div>
        
        <!-- Weather forecast data display -->
        <div class="collapse-content">  
          <div class="grid gap-3 md:grid-cols-3">
            <div
              v-for="weatherData in dayWeatherData"
              :key="weatherData.dt"
            >
              <CardWeather :data="weatherData" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Weather forecast else -->
  <div v-else class="mt-4">
    <p class="text-center text-sm">
      Please enter a location to get the Weather Forecast
    </p>
  </div>

  <ModalError :locationName="`${locationModel}`" />
</template>
