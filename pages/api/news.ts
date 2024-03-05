import type { NextApiRequest, NextApiResponse } from "next";
import { Article } from "@/common/types";
import { getQueryParam } from "@/common/utils";

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

interface QueryParams {
  category?: string;
}

// Server-side service to fetch data from NewsAPI
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewsApiResponse | { error: string }>
) {
  const { category } = req.query as QueryParams;

  const apiKey = process.env.NEWSAPI_KEY;
  if (!apiKey) {
    console.error("NewsAPI API key is not set.");
    res.status(500).json({ error: "Internal server error." });
    return;
  }

  const baseUrl = "https://newsapi.org/v2/top-headlines?country=au";
  const url = category
    ? `${baseUrl}&category=${encodeURIComponent(
        getQueryParam(category)
      )}&apiKey=${apiKey}`
    : `${baseUrl}&apiKey=${apiKey}`;

  try {
    const newsApiResponse = await fetch(url);

    if (!newsApiResponse.ok) {
      throw new Error(
        `NewsAPI responded with status: ${newsApiResponse.status}, ${newsApiResponse.statusText}`
      );
    }

    const newsData: NewsApiResponse = await newsApiResponse.json();
    res.status(200).json(newsData);
  } catch (error) {
    console.error("Error fetching news:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch news. Please try again later." });
  }
}
