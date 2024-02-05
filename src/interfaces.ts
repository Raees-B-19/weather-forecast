export interface GeographicalCoordinates {
  lat: number;
  lon: number;
}

export interface LocationData {
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
  wind: {
    speed: number, // metres per second
    deg: number,
    gust: number
  }
  dt_txt: string; // 2024-02-05 00:00:00
}

export interface WeatherDataArray {
  [index: number]: WeatherData[];
}
