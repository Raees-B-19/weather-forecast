<script setup lang="ts">
// Props
defineProps<{
  locationName: string;
}>();
</script>

<template>
  <dialog id="error-favorite-location-modal" class="modal">
    <div class="modal-box border-2 border-rose-500">
      <div class="mb-3">
        <form method="dialog">
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
      </div>

      <p class="font-bold text-lg text-rose-300 mb-3">Error</p>

      <p class="mb-3">{{ locationName }} is already in your favourite locations</p>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
