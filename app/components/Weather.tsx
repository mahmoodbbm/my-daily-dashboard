"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface WeatherData {
  main: {
    temp: number;
  };
  name: string;
  weather: [{ description: string }];
}

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get<WeatherData>('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: 'Sydney',
            units: 'metric',
            appid: process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY,
          },
        });
        setWeather(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div>
      {weather ? (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Description: {weather.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;