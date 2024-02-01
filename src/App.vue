<script setup lang="ts">
import { RouterView } from "vue-router";

// Icon Documentation
import IconDocumentation from "@/components/icons/Documentation.vue";

// Show documentation modal
function handleShowDocumentationModal() {
  let documentationModal = document.getElementById(
    "documentation-modal"
  ) as HTMLDialogElement;

  // Show the documentation modal
  documentationModal.showModal(); 
}
</script>

<template>
  <div class="container mx-auto mt-4 p-2 md:w-4/5">
    <h1 class="text-3xl mb-5">Weather Forecast</h1>

    <div
      @click="handleShowDocumentationModal"
      class="flex items-center mb-5 cursor-pointer"
    >
      <IconDocumentation />

      <p class="ml-2">How to use</p>
    </div>

    <RouterView />
  </div>
</template>

<style scoped></style>
