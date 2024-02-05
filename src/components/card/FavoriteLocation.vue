<script setup lang="ts">
// Modal
import ModalConfirm from "@/components/modal/Confirm.vue";

// emits
defineEmits(["getWeatherForecast", "closeModal", "removeFavoriteLocation"]);

// props
defineProps<{
  country: string;
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
  <div class="border-2 border-white/30 p-2 rounded-md">
    <h2 class="text-2xl font-medium mb-2">{{ locationName }}</h2>

    <div class="card-actions justify-start">
      <!-- Get weather forecast -->
      <button
        type="button"
        class="btn btn-primary"
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
        class="btn btn-error"
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
