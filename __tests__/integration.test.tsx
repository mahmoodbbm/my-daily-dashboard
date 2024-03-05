import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../app/page";

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

describe("Home Page Integration Test", () => {
  it("renders the home page with all components and content", () => {
    // Given
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockWeatherData),
      })
    );

    // When
    render(<Home />);

    // Then
    // Verify the main title is rendered
    expect(screen.getByText("My Daily Dashboard")).toBeInTheDocument();

    // Verify the presence of section titles
    expect(screen.getByText("Weather Widget")).toBeInTheDocument();
    expect(screen.getByText("Daily wisdom")).toBeInTheDocument();
    expect(screen.getByText("News Feed")).toBeInTheDocument();
  });
});
