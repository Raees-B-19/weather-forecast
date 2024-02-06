<script setup lang="ts">
// Props
defineProps<{
  locationName: string;
}>();
</script>

<template>
  <dialog id="error-modal" class="modal">
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

      <p class="mb-3">Unable to get weather forecast for {{ locationName }}.</p>

      <p>Please check your internet connection</p>

      <p class="my-3">
        Please enter a known location
        <span class="font-bold">e.g. Cape Town</span>.
      </p>

      <p>If the problem persist, please refresh the page.</p>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
