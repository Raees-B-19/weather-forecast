<script setup lang="ts">
// Icon
import IconBookmark from "@/components/icons/Bookmark.vue";
</script>

<template>
  <dialog id="documentation-modal" class="modal">
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

      <!-- How to use -->
      <div>
        <p class="font-bold text-lg">How to use</p>

        <hr class="my-3" />

        <p>
          This website allows you to estimate the weather for the next 5 days.
        </p>

        <p class="my-3">
          Go to the search bar, enter a location,
          <span class="font-bold">e.g. Cape Town</span>.
        </p>

        <p>You should see the weather forecast data for the location.</p>

        <p class="my-3">
          The <span class="font-bold">Save Location Icon </span>
          <IconBookmark class="inline-block" /> should appear if you have not
          saved the location under your favorite locations.
        </p>

        <p class="my-3">
          If you did not receive any weather forecast, please try again or
          refresh the page.
        </p>
      </div>

      <!-- Favourite Locations -->
      <div>
        <p class="font-bold text-lg">About Favourite Locations</p>

        <hr class="my-3" />

        <p>
          If you have saved the location, you should see it under your favorite
          locations.
        </p>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
