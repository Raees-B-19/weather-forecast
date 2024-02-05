<script setup lang="ts">
// props
defineProps<{
  locationName: string;
}>();

// emits
defineEmits(["removeFavoriteLocation"]);

// Close Popup
function confirmPopupClose(modalLocationName: string) {
  let confirmPopupModal = document.getElementById(
    `confirm-popup-modal-${modalLocationName}`
  ) as HTMLDialogElement;

  confirmPopupModal.close();
}
</script>

<template>
  <dialog :id="'confirm-popup-modal-' + locationName" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>

      <h3 class="text-lg mb-3">
        Remove <span class="font-semibold">{{ locationName }}</span> from your favourite locatons?
      </h3>

      <!-- Cancel -->
      <button
      type="button"
      class="btn btn-success bg-transparent text-white/70 hover:text-white/90"
      @click="confirmPopupClose(locationName)"
      >
        Cancel
      </button>
      
      <!-- Remove -->
      <button
        type="button"
        class="btn btn-error bg-transparent text-white/70 ml-2 hover:text-white/90"
        @click="
          confirmPopupClose(locationName);
          $emit('removeFavoriteLocation');
        "
      >
        Remove
      </button>
    </div>
  </dialog>
</template>
