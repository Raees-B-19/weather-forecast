<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="text-center">
    <p class="mb-4 text-2xl font-bold">
      Looks like you are somewhere unknown.
    </p>
    
    <p class="mb-4 text-lg">Please use the button below to return back.</p>

    <RouterLink to="/">
      <div class="btn btn-primary">
        <p>Back to Weather Forecast Page</p>
      </div>
    </RouterLink>
  </div>
</template>
