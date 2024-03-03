import type { NextApiRequest, NextApiResponse } from "next";
import { WeatherData } from "@/common/types";

interface QueryParams {
  cityName?: string;
  latitude?: string;
  longitude?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherData | { error: string }>
) {
  const { cityName, latitude, longitude } = req.query as QueryParams;

  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  if (!apiKey) {
    console.error("OpenWeatherMap API key is not set.");
    res.status(500).json({ error: "Internal server error." });
    return;
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}`;

  if (latitude && longitude) {
    url += `&lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(
      longitude
    )}`;
  } else if (cityName) {
    url += `&q=${encodeURIComponent(cityName)}`;
  } else {
    res.status(400).json({ error: "Invalid or missing query parameters." });
    return;
  }

  try {
    const weatherApiResponse = await fetch(url);

    if (!weatherApiResponse.ok) {
      const errorMessage = await weatherApiResponse.text(); // Attempt to read error message
      console.error(`OpenWeatherMap error: ${errorMessage}`);
      res.status(weatherApiResponse.status).json({
        error: `Failed to fetch weather data: ${weatherApiResponse.statusText}`,
      });
      return;
    }

    const weatherData: WeatherData = await weatherApiResponse.json();
    res.status(200).json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({
      error: "Failed to fetch weather data. Please try again later.",
    });
  }
}
