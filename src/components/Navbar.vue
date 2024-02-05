<script setup lang="ts">
// Icon
import IconBookmark from "@/components/icons/Bookmark.vue";
import IconDocumentation from "@/components/icons/Documentation.vue";
import IconBurgerMenu from "@/components/icons/BurgerMenu.vue";

// Modals
import ModalDocumentation from "@/components/modal/Documentation.vue";
import ModalFavouriteLocations from "@/components/modal/FavouriteLocations.vue";

// Show Modal
function handleShowModal(modalId: string) {
  let documentationModal = document.getElementById(
    modalId
  ) as HTMLDialogElement;

  // Show the documentation modal
  documentationModal.showModal();
}
</script>

<template>
  <div class="navbar bg-base-100 mb-5 border-2 border-white/60 rounded-md">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <IconBurgerMenu />
        </div>

        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <div
              @click="handleShowModal('documentation-modal')"
              class="flex items-center cursor-pointer"
            >
              <IconDocumentation />

              <p class="text-white/80">How to use</p>
            </div>
          </li>
          <li>
            <div
              @click="handleShowModal('favourite-locations-modal')"
              class="flex items-center cursor-pointer"
            >
              <IconBookmark />

              <p class="text-white/80">Favourite Locations</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="navbar-center">
      <h1 class="text-x1 font-bold text-white/75">Weather Forecast</h1>
    </div>

    <div class="navbar-end">
    </div>
  </div>

  <ModalDocumentation />
  <ModalFavouriteLocations />
</template>
