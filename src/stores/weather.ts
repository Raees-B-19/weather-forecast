import { defineStore } from "pinia";

// Interfaces
import {
  type GeographicalCoordinates,
  type LocationData,
  type WeatherDataArray,
} from "@/interfaces";

// Favorite Location Array
let favoriteLocations: LocationData[] = [];
let currentWeatherData: WeatherDataArray = [];

// Current locaitond data
let currentLocationData: LocationData = {
  locationName: "",
  lat: 0,
  lon: 0,
};

// Export weather store
export const useWeatherStore = defineStore("weatherStore", {
  state: () => ({
    apiKey: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
    openWeatherMapUrl: "https://api.openweathermap.org",
    displaySaveLocationButton: false,
    favoriteLocations: favoriteLocations,
    currentLocationData: currentLocationData,
    currentWeatherData: currentWeatherData,
  }),
  actions: {
    async getGeographicalCoordinates(
      location: string
    ): Promise<GeographicalCoordinates | null> {
      // Build the url
      let url = this.openWeatherMapUrl + "/geo/1.0/direct";

      // Number of the locations ( max 5 )
      let limit = 1;

      // Replace spaces with underscore
      location = location.replace(" ", "_");

      // Add onto url
      url += `?q=${location}&limit=${limit}&appid=${this.apiKey}`;

      try {
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
      } catch (error) {
        console.error("Error getting geographical coordinates: ", error);

        return null;
      }
    },
    async getWeatherForecast(lat: number, lon: number) {
      // Build the url
      let url = this.openWeatherMapUrl + "/data/2.5/forecast";

      // Add coordinates to url
      url += `?lat=${lat}&lon=${lon}`;
      url += `&units=metric`; // for celsuis
      url += `&appid=${this.apiKey}`;

      // Make Fetch
      try {
        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            // Update currentLocationData location name
            this.currentLocationData.locationName = data.city.name;

            // If country not null
            if (data.city.country != "") {
              // Add country to currentLocationData
              this.currentLocationData.country = data.city.country;
            }

            // Organize via each day
            let currentWeatherDate = null;
            let previousWeatherDate = null;
            let dateArray = [];
            let organizedDateArray = [];

            // Store weather forecast data from api
            let dataList = data.list;

            // Loop over dataList
            for (let i = 0; i < dataList.length; i++) {
              // Format and get date
              let formatedDate = new Date(dataList[i].dt_txt);

              // Current weather date
              currentWeatherDate = `${formatedDate.getDate()}-${formatedDate.getMonth()}-${formatedDate.getFullYear()}`;

              // Check if the date has changed
              if (
                currentWeatherDate !== previousWeatherDate &&
                previousWeatherDate !== null
              ) {
                // Push dateArray into organizedDateArray
                organizedDateArray.push(dateArray);

                // Reset the array for the new date
                dateArray = [];
              }

              // Push the current data into dateArray
              dateArray.push(dataList[i]);

              // Update the previous weather date for next iteration
              previousWeatherDate = currentWeatherDate;
            }

            // Save location weather data
            this.currentWeatherData = organizedDateArray;
          });
      } catch (error) {
        console.error("Error getting weather forecast", error);

        return null;
      }
    },
    checkIfInFavoriteLocations() {
      // Find current location name in favorite locations
      let newFavoriteLocation = this.favoriteLocations.find(
        (location) =>
          location.locationName == this.currentLocationData.locationName
      );

      // Check if in favorite locations
      if (newFavoriteLocation == undefined) {
        // Not in favorite locations
        return false;
      }

      // In favorite locations
      return true;
    },
    addToFavoriteLocations() {
      // Check if location exist in favorite locations
      if (!this.checkIfInFavoriteLocations()) {
        // Doesn't exist in favorite locations
        this.favoriteLocations.push(this.currentLocationData);
      } else {
        // Already in favourite locations
        throw new Error(this.currentLocationData.locationName + ' is already in favourite locations.');
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
  persist: {
    paths: ["favoriteLocations"],
  },
});
