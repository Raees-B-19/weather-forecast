export interface GeographicalCoordinates {
  lat: number;
  lon: number;
}

export interface LocationData {
  country?: string;
  locationName: string;
  lat: number;
  lon: number;
}

export interface WeatherData {
  dt: number; // The time
  main: {
    temp: number; //current temperature
    pressure: number;
    humidity: number;
    temp_min: number; //min current temperature in the city
    temp_max: number; //max current temperature in the city
  };
  weather: [
    {
      id: number,
      main: string,
      description: string,
      icon: string
    }
  ],
  dt_txt: string;
}
