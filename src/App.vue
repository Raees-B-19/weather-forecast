<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container mx-auto bg-base-100">
    <header>
      <div class="navbar">
        <RouterLink to="/" class="text-xl">Home</RouterLink>
        <RouterLink to="/about" class="text-xl ml-3">About</RouterLink>
      </div>
    </header>
  
    <div class="p-2">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
