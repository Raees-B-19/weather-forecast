import { defineStore } from "pinia";

// Favorite Location Array
const favoriteLocations: string[] = [];

export const useWeatherStore = defineStore("weatherStore", {
  state: () => ({
    favoriteLocations: favoriteLocations,
  }),
  persist: true,
});
