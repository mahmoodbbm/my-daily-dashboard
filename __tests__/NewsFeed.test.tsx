import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import NewsFeed from "../app/components/NewsFeed";

const mockArticles = [
  {
    title: "Test Article 1",
    description: "Description of test article 1",
    url: "https://example.com/article1",
    urlToImage: "https://example.com/image1.jpg",
  },
  {
    title: "Test Article 2",
    description: "Description of test article 2",
    url: "https://example.com/article2",
    urlToImage: "https://example.com/image2.jpg",
  },
];

describe("NewsFeed Component", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ articles: mockArticles }),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  test("renders correctly with initial state", () => {
    // Given

    // When
    render(<NewsFeed />);

    // Then
    expect(screen.getByTitle("Select a news category")).toBeInTheDocument();
    expect(screen.getByTitle("Load news")).toBeInTheDocument();
    expect(screen.getByTitle("Load news")).toBeEnabled();
  });

  test("loads news articles on button click", async () => {
    // Given

    // When
    render(<NewsFeed />);
    const loadNewsButton = screen.getByTitle("Load news");
    userEvent.click(loadNewsButton);

    // Then
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(screen.getByText("Test Article 1")).toBeInTheDocument();
      expect(screen.getByText("Test Article 2")).toBeInTheDocument();
    });
  });

  test("changes category and loads news articles", async () => {
    // Given

    // When
    render(<NewsFeed />);
    const selectCategory = screen.getByTitle("Select a news category");
    userEvent.selectOptions(selectCategory, ["Technology"]);
    const loadNewsButton = screen.getByTitle("Load news");
    userEvent.click(loadNewsButton);

    // Then
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/news?category=Technology"
      );
      expect(screen.getByText("Test Article 1")).toBeInTheDocument();
      expect(screen.getByText("Test Article 2")).toBeInTheDocument();
    });
  });

  test("handles fetch error gracefully", async () => {
    // Given
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("API is down"))
    );

    // When
    render(<NewsFeed />);
    const loadNewsButton = screen.getByTitle("Load news");
    userEvent.click(loadNewsButton);

    // Then
    await waitFor(() => {
      expect(screen.queryByText("Test Article 1")).not.toBeInTheDocument();
    });
  });
});
