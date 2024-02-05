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
  <div class="card w-96 bg-base-100 shadow-xl mb-3">
    <div class="card-body">
      <h2 class="card-title">{{ locationName }}</h2>

      <p v-if="country">Country: {{ country }}</p>

      <div class="card-actions justify-start">
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
        
        <button
          type="button"
          class="btn btn-error"
          @click="confirmPopupOpen(locationName)"
        >
          Remove
        </button>
      </div>
    </div>
  </div>

  <ModalConfirm
    :locationName="`${locationName}`"
    @removeFavoriteLocation="$emit('removeFavoriteLocation')"
  />
</template>
