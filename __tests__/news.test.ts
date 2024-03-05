import { NextApiRequest, NextApiResponse } from "next";
import { createMocks } from "node-mocks-http";
import handler from "../pages/api/news";

const mockArticles = [
  {
    author: "Author One",
    title: "Example Article Title",
    description: "This is an example of an article description.",
    url: "https://example.com/article",
    urlToImage: "https://example.com/image.jpg",
    publishedAt: "2021-01-01T00:00:00Z",
  },
];

const mockNewsFetchResult = {
  status: "ok",
  totalResults: mockArticles.length,
  articles: mockArticles,
};

// Mocking the global fetch method
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: async () => Promise.resolve(mockNewsFetchResult),
  })
) as jest.Mock;

describe("/api/news", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test("returns news data successfully", async () => {
    // Given
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
      query: {
        category: "technology",
      },
    });

    process.env.NEWSAPI_KEY = "test_api_key";

    // When
    await handler(req, res);

    // Then
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toStrictEqual(mockNewsFetchResult);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://newsapi.org/v2/top-headlines?country=au&category=technology&apiKey=test_api_key"
    );
  });

  test("handles query params missing error gracefully", async () => {
    // Given
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
    });

    process.env.NEWSAPI_KEY = "test_api_key";

    // When
    await handler(req, res);

    // Then
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toStrictEqual(mockNewsFetchResult);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://newsapi.org/v2/top-headlines?country=au&apiKey=test_api_key"
    );
  });

  test("handles env var missing error gracefully", async () => {
    // Given
    process.env.NEWSAPI_KEY = "";

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
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
    // Make fetch fail
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject("API is down")
    );

    process.env.NEWSAPI_KEY = "test_api_key";

    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      method: "GET",
    });

    // When
    await handler(req, res);

    // Then
    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toHaveProperty("error");
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://newsapi.org/v2/top-headlines?country=au&apiKey=test_api_key"
    );
  });
});
