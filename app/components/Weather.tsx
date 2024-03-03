"use client";

import React, { useEffect, useState } from "react";
import { WeatherData } from "@/common/types";

const Weather = () => {
  const [city, setCity] = useState<string>("Sydney"); // Default city
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const fetchWeather = async (
    cityName: string,
    latitude?: number,
    longitude?: number
  ) => {
    try {
      let weatherServicePath = "/api/weather?";
      weatherServicePath +=
        latitude && longitude
          ? `latitude=${latitude}&longitude=${longitude}`
          : `cityName=${cityName}`;
      const response = await fetch(weatherServicePath);
      const data = await response.json();
      setWeather(data);
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
