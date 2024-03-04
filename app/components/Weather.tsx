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
    <div className="w-full max-w-sm">
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          className="appearance-none w-48 bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          required
        />
        <button
          title="Get weather"
          className="ml-1 flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 border-indigo-500 hover:border-indigo-700 text-base border-4 text-white py-2 px-2 rounded"
          type="submit"
        >
          Get Weather
        </button>
        <button
          title="Use my location"
          className="ml-1 flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 border-indigo-500 hover:border-indigo-700 text-base border-4 text-white py-2 px-2 rounded"
          type="button"
          onClick={fetchWeatherByLocation}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
        </button>
      </form>

      {weather ? (
        <div className="mt-2 max-w-sm w-full flex items-left">
          <div
            className="w-48 flex-none rounded-t text-left overflow-hidden"
            title="Woman holding a mug"
          >
            <label
              htmlFor="info-city-name"
              className="text-gray-400 font-bold text-base mb-2"
            >
              Weather in
            </label>
            <p
              id="info-city-name"
              className="text-gray-900 font-bold text-xl mb-2"
            >
              {weather.name}
            </p>
            <label
              htmlFor="info-city-temp"
              className="text-gray-400 font-bold text-base mb-2"
            >
              Temperature
            </label>
            <p
              id="info-city-temp"
              className="text-gray-900 font-bold text-xl mb-2"
            >
              {weather.main.temp}°C
            </p>
            <label
              htmlFor="info-city-desc"
              className="text-gray-400 font-bold text-base mb-2"
            >
              Description
            </label>
            <p
              id="info-city-desc"
              className="text-gray-900 font-bold text-xl mb-2"
            >
              {weather.weather[0].description}
            </p>
          </div>
          <div className="w-full flex items-center">
            <img
              className="border border-gray-300 shadow-xl"
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather icon"
            />
          </div>
        </div>
      ) : (
        <p>Enter a city or use your location to get started.</p>
      )}
    </div>
  );
};

export default Weather;
