"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface WeatherData {
  main: {
    temp: number;
  };
  name: string;
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
}

const Weather = () => {
  const [city, setCity] = useState<string>("Sydney"); // Default city
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const fetchWeather = async (
    cityName: string,
    latitude?: number,
    longitude?: number
  ) => {
    try {
      const params =
        latitude && longitude
          ? {
              lat: latitude,
              lon: longitude,
              units: "metric",
              appid: process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY,
            }
          : {
              q: cityName,
              units: "metric",
              appid: process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY,
            };

      const response = await axios.get<WeatherData>(
        "https://api.openweathermap.org/data/2.5/weather",
        { params }
      );
      setWeather(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch weather data. Please try again.");
      setWeather(null);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []); // React to changes in the city state

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchWeather(city);
  };

  const fetchWeatherByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather("", position.coords.latitude, position.coords.longitude);
        },
        () => {
          alert("Unable to retrieve your location");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          required
        />
        <button type="submit">Get Weather</button>
      </form>
      <button type="button" onClick={fetchWeatherByLocation}>
        Use My Location
      </button>

      {weather ? (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Description: {weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather icon"
          />
        </div>
      ) : (
        <p>Enter a city or use your location to get started.</p>
      )}
    </div>
  );
};

export default Weather;
