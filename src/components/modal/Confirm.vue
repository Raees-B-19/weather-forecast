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

      <h3 class="font-bold text-lg mb-3">
        Remove {{ locationName }} from favourite locaton?
      </h3>

      <button
        type="button"
        class="btn btn-info"
        @click="confirmPopupClose(locationName)"
      >
        Cancel
      </button>

      <button
        type="button"
        class="btn btn-error ml-2"
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
