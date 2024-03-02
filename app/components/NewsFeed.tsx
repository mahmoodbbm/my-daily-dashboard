"use client";

import React, { useState } from "react";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string; // Optional property example
  publishedAt: string;
  author?: string; // Optional property example
}

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    const response = await fetch("/api/news");
    const data = await response.json();
    setArticles(data.articles || []);
    setLoading(false);
  };

  return (
    <div>
      <button onClick={fetchNews} disabled={loading}>
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
