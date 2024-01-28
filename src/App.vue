<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container mx-auto">
    <header>
      <div class="navbar justify-center">
        <RouterLink to="/" class="text-xl">Home</RouterLink>
        <RouterLink to="/about" class="text-xl ml-3">About</RouterLink>
        <RouterLink to="/weather" class="text-xl ml-3">Weather</RouterLink>
      </div>
    </header>
  
    <div class="p-2">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
