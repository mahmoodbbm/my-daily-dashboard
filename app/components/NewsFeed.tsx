"use client";

import React, { useState } from "react";
import { Article } from "@/common/types";

const categories = [
  "Technology",
  "Business",
  "Sports",
  "Entertainment",
  "Health",
  "Science",
];

const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const fetchNews = async (category: string = "") => {
    setLoading(true);
    try {
      const newsServicePath = category
        ? `/api/news?category=${category}`
        : `/api/news`;
      const response = await fetch(newsServicePath);
      const data = await response.json();
      setArticles(data.articles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <select
        title="Select a news category"
        className="appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        onBlur={(e) => fetchNews(e.target.value)}
      >
        <option value="">Select a category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button
        title="Load news"
        className="ml-2 flex-shrink-0 bg-indigo-500 hover:bg-indigo-700 border-indigo-500 hover:border-indigo-700 text-base border-4 text-white py-2 px-2 rounded"
        onClick={() => fetchNews(selectedCategory)}
        disabled={loading}
      >
        {loading ? "Loading..." : "Load News"}
      </button>
      {articles.length > 0 && (
        <div className="flex flex-wrap justify-left mt-5">
          {articles.map((article: Article, index: number) => (
            <div
              key={index}
              className="border border-gray-100 max-w-sm rounded overflow-hidden shadow-lg mt-5"
            >
              {article.urlToImage && (
                <img
                  className="w-full"
                  src={article.urlToImage}
                  alt={article.title}
                />
              )}
              <div className="px-6 py-4">
                <h3 className="font-bold text-base mb-2">{article.title}</h3>
                <p className="text-gray-700 text-base">{article.description}</p>
                <a
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
