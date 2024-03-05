import { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import handler from "../pages/api/weather";

const mockWeatherData = {
  coord: { lon: 139, lat: 35 },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01n",
    },
  ],
  base: "stations",
  main: {
    temp: 293.15,
    feels_like: 293.84,
    temp_min: 289.82,
    temp_max: 295.37,
    pressure: 1016,
    humidity: 50,
  },
  visibility: 10000,
  wind: { speed: 3.6, deg: 230 },
  clouds: { all: 0 },
  dt: 1603945138,
  sys: {
    type: 1,
    id: 8074,
    country: "JP",
    sunrise: 1603896240,
    sunset: 1603937488,
  },
  timezone: 32400,
  id: 1851632,
  name: "Shuzenji",
  cod: 200,
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: async () => Promise.resolve(mockWeatherData),
  })
) as jest.Mock;

describe("/api/weather", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test("returns weather data successfully with cityName", async () => {
    // Given
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
      query: {
        cityName: "Tokyo",
      },
    });

    process.env.OPENWEATHERMAP_API_KEY = "test_api_key";

    // When
    await handler(req, res);

    // Then
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toStrictEqual(mockWeatherData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=test_api_key&q=Tokyo`
    );
  });

  test("returns weather data successfully with latitude and longitude", async () => {
    // Given
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
      query: {
        latitude: "35.5",
        longitude: "38.3",
      },
    });

    process.env.OPENWEATHERMAP_API_KEY = "test_api_key";

    // When
    await handler(req, res);

    // Then
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toStrictEqual(mockWeatherData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=test_api_key&lat=35.5&lon=38.3`
    );
  });

  test("handles env var missing error gracefully", async () => {
    // Given
    process.env.OPENWEATHERMAP_API_KEY = "";

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
      query: {
        cityName: "Tokyo",
      },
    });

    // When
    await handler(req, res);

    // Then
    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toHaveProperty("error");
    expect(fetch).toHaveBeenCalledTimes(0);
  });

  test("handles fetch error gracefully", async () => {
    // Given
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("API is down"))
    );

    process.env.OPENWEATHERMAP_API_KEY = "test_api_key";

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
      query: {
        cityName: "Tokyo",
      },
    });

    // When
    await handler(req, res);

    // Then
    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toHaveProperty("error");
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=test_api_key&q=Tokyo`
    );
  });
});
