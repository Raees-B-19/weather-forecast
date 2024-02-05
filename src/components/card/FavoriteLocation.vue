<script setup lang="ts">
// Modal
import ModalConfirm from "@/components/modal/Confirm.vue";

// emits
defineEmits(["getWeatherForecast", "closeModal", "removeFavoriteLocation"]);

// props
defineProps<{
  country?: string;
  locationName: string;
}>();

// Open Popup
function confirmPopupOpen(modalLocationName: string) {
  let confirmPopupModal = document.getElementById(
    `confirm-popup-modal-${modalLocationName}`
  ) as HTMLDialogElement;

  confirmPopupModal.showModal();
}
</script>

<template>
  <div class="border-2 border-white/20 rounded-md mb-3 p-2">
    <h2 class="text-xl font-medium mb-2 lg:text-2xl">{{ locationName }}</h2>
    <h2 class="text-md mb-2">Country: {{ country }}</h2>

    <div class="card-actions justify-start">
      <!-- Get weather forecast -->
      <button
        type="button"
        class="btn btn-success bg-transparent text-white/70 hover:text-white/90"
        @click="
          $emit('getWeatherForecast');
          $emit('closeModal');
        "
      >
        Get Weather
      </button>

      <!-- Remove from favourite locations -->
      <button
        type="button"
        class="btn btn-error bg-transparent text-white/70 hover:text-white/90"
        @click="confirmPopupOpen(locationName)"
      >
        Remove
      </button>
    </div>
  </div>

  <ModalConfirm
    :locationName="`${locationName}`"
    @removeFavoriteLocation="$emit('removeFavoriteLocation')"
  />
</template>
