<script setup lang="ts">
// Props
defineProps<{
  locationName: string
}>()
</script>

<template>
    <dialog id="error-modal" class="modal">
      <div class="modal-box border-2 border-rose-500">
        <h3 class="font-bold text-lg text-rose-300 mb-3">Error</h3>

        <p class="mb-3">
          Unable to get weather forecast for {{ locationName }}.
        </p>

        <p>
          Please enter a known location
          <span class="font-bold">e.g Cape Town</span>.
        </p>

        <p class="py-3">Press ESC key or click outside to close.</p>
      </div>

      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
</template>
