"use client";

import { useEffect, useState } from "react";
import { Quote } from "@/common/types";

const DailyQuote = () => {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("/data/quotes.json");
        const quotes: Quote[] = await response.json();

        // Select a random quote
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
      } catch (error) {
        console.error("Failed to fetch the quotes:", error);
        // Handle error state appropriately
        setQuote(null);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div>
      {quote ? (
        <>
          <p>&quot;{quote.text}&quot;</p>
          <p>- {quote.person}</p>
        </>
      ) : (
        <p>No quote available. Please try again later.</p>
      )}
    </div>
  );
};

export default DailyQuote;
