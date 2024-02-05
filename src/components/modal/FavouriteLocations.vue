<script setup lang="ts">
// Store
import { useWeatherStore } from "@/stores/weather";

const weatherStore = useWeatherStore();

// Card
import CardFavoriteLocation from "@/components/card/FavoriteLocation.vue";

// Close Modal
function closeModal(modalId: string) {
  let modal = document.getElementById(modalId) as HTMLDialogElement

  modal.close();
}
</script>

<template>
  <dialog id="favourite-locations-modal" class="modal">
    <div class="modal-box">
      <div class="mb-3">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
      </div>

      <div v-if="weatherStore.favoriteLocations.length > 0">
        <p class="text-2xl font-bold mb-3">Favourite Locations</p>
        
        <div
          v-for="locationData in weatherStore.favoriteLocations"
          :key="locationData.locationName"
        >
          <CardFavoriteLocation
            :country="`${locationData.country}`"
            :locationName="locationData.locationName"
            @getWeatherForecast="
              weatherStore.getWeatherForecast(
                locationData.lat,
                locationData.lon
              )
            "
            @closeModal="closeModal('favourite-locations-modal')"
            @removeFavoriteLocation="
              weatherStore.removeFavoriteLocation(locationData.locationName)
            "
          />
        </div>
      </div>

      <div v-else>
        <p>
          No favorite locations for weather updates? Explore and save your
          preferred places to receive weather forecasts.
        </p>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
