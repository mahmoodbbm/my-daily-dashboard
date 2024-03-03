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
      // Handle error state
    }
  };

  return (
    <div>
      <select
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
      <button onClick={() => fetchNews(selectedCategory)} disabled={loading}>
        {loading ? "Loading..." : "Load News"}
      </button>
      {articles.length > 0 && (
        <div>
          <h2>Top Headlines</h2>
          {articles.map((article: Article, index: number) => (
            <div key={index}>
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                  }}
                />
              )}
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
