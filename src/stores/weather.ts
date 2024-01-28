import { defineStore } from "pinia";

// Interfaces
import { type GeographicalCoordinates } from "@/interfaces";

// Favorite Location Array
const favoriteLocations: object[] = [];

export const useWeatherStore = defineStore("weatherStore", {
  state: () => ({
    apiKey: "c71a382e51b62d85bce7fe1e6db2810f",
    openWeatherMapUrl: "https://api.openweathermap.org",
    displaySaveLocationButton: false,
    favoriteLocations: favoriteLocations,
    currentLocationData: {},
  }),
  actions: {
    async getGeographicalCoordinates(
      location: string
    ): Promise<GeographicalCoordinates> {
      // Build the url
      let url = this.openWeatherMapUrl + "/geo/1.0/direct";

      let limit = 1;

      // Replace spaces with underscore
      location = location.replace(" ", "_");

      // Add onto url
      url += `?q=${location}&limit=${limit}&appid=${this.apiKey}`;

      // Make Fetch
      let response = await fetch(url);

      // Check if ok
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Get json response
      let data = await response.json();

      // Get coordinates
      let coordinates: GeographicalCoordinates = {
        lat: data[0].lat,
        lon: data[0].lon,
      };

      return coordinates;
    },
    async getWeatherForecast(lat: number, lon: number) {
      let url = this.openWeatherMapUrl + "/data/2.5/forecast";

      // Add coordinates to url
      url += `?lat=${lat}&lon=${lon}&appid=${this.apiKey}`;

      // Make Fetch
      await fetch(url)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error:", error));
    },
    checkIfInFavoriteLocations() {
      let newFavoriteLocation = this.favoriteLocations.find(
        (location) =>
          location.locationName == this.currentLocationData.locationName
      );

      // Not in favorite locations
      if (newFavoriteLocation == undefined) {
        return false;
      }

      return true;
    },
    addToFavoriteLoactions() {
      if (!this.checkIfInFavoriteLocations()) {
        this.favoriteLocations.push(this.currentLocationData);
      } else {
        console.log("In favs already");
      }
    },
    removeFavoriteLocation(locationName: string) {
      // Filter out location name
      let newFavoriteLocations = this.favoriteLocations.filter(
        (location) => location.locationName != locationName
      );
      
      // Save new favorite locations
      this.favoriteLocations = newFavoriteLocations;
    },
  },
  persist: true,
});
