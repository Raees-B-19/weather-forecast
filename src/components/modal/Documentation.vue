<template>
  <dialog id="documentation-modal" class="modal">
    <div class="modal-box">
      <p>
        This is a weather forecast website to estimate the next 5 days of weather
      </p>
      
      <hr class="my-3">
      
      <h3 class="font-bold text-lg">How to use</h3>

      <p class="my-3">
        In the search bar enter a location. <span class="font-bold">e.g Cape Town</span>
      </p>

      <p>
        You should see the weather forecast data for the location.
      </p>

      <p class="my-3">
        The <span class="font-bold">Save Location Button</span> should appear if you did not save the location under your favourite locations.
      </p>

      <p>
        If you did save the location. A card with the location appear.
      </p>

      <p class="my-3">
        If you did not get any weather forecast please try again or refresh the page.
      </p>

      <p>
        Enjoy the rest of your day.
      </p>

      <p class="py-3">Press ESC key or click outside to close</p>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
