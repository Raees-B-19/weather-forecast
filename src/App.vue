<script setup lang="ts">
import { RouterView } from "vue-router";

// Get current year
let currentYear = new Date().getFullYear();
</script>

<template>
  <div class="container mx-auto mt-4 p-2 md:w-4/5">
    <RouterView />
  </div>

  <footer>
    <p class="text-center">&copy; Copyright {{ currentYear }}</p>
  </footer>
</template>

<style scoped></style>
