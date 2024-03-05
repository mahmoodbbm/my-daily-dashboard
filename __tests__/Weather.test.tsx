import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Weather from "../app/components/Weather";

beforeAll(() => {
  global.fetch = jest.fn();
});

beforeEach(() => {
  (global.fetch as jest.Mock).mockClear();
});

afterAll(() => {
  jest.restoreAllMocks();
});

const mockWeatherData = {
  name: "Sydney",
  main: { temp: 22 },
  weather: [{ description: "clear sky", icon: "01d" }],
};

describe("Weather Component", () => {
  test("fetches and displays weather data on form submission", async () => {
    // Given
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockWeatherData),
      })
    );

    // When
    render(<Weather />);
    const inputElement = screen.getByPlaceholderText("Enter city name");
    const getWeatherButton = screen.getByTitle("Get weather");

    fireEvent.change(inputElement, { target: { value: "Sydney" } });
    fireEvent.click(getWeatherButton);

    // Then
    await waitFor(() => {
      expect(screen.getByText("Weather in")).toBeInTheDocument();
      expect(screen.getByText("Sydney")).toBeInTheDocument();
      expect(screen.getByText("22°C")).toBeInTheDocument();
      expect(screen.getByText("clear sky")).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("cityName=Sydney")
    );
  });

  test("displays error message on fetch failure", async () => {
    // Given
    jest.spyOn(window, "alert").mockImplementation(() => {});

    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("API is down"))
    );

    // When
    render(<Weather />);
    const inputElement = screen.getByPlaceholderText("Enter city name");
    const getWeatherButton = screen.getByTitle("Get weather");

    fireEvent.change(inputElement, { target: { value: "InvalidCity" } });
    fireEvent.click(getWeatherButton);

    // Then
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalled();
    });
  });
});
