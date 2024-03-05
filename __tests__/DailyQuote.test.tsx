import { render, screen, waitFor } from "@testing-library/react";
import DailyQuote from "../app/components/DailyQuote";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([{ id: 1, text: "Test Quote", person: "Test Author" }]),
  })
) as jest.Mock;

describe("DailyQuote", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    (fetch as jest.Mock).mockClear();
  });

  test("fetches quotes and displays a random quote", async () => {
    // Given

    // When
    render(<DailyQuote />);

    // Wait for the quote to be fetched and displayed
    await waitFor(() =>
      expect(screen.getByText(/Test Quote/)).toBeInTheDocument()
    );

    // Then
    expect(screen.getByText(/Test Quote/)).toBeInTheDocument();
    expect(screen.getByText(/- Test Author/)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("/data/quotes.json");
  });

  test("displays error message when fetch fails", async () => {
    // Given
    // Make fetch fail
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject("API is down")
    );

    // When
    render(<DailyQuote />);

    // Then
    // Wait for the component to update with the error message
    await waitFor(() =>
      expect(
        screen.getByText(/No quote available. Please try again later./)
      ).toBeInTheDocument()
    );
  });
});
