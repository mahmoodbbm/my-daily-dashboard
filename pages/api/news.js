export default async function handler(req, res) {
  const {
    query: { category },
  } = req;

  const apiKey = process.env.NEWSAPI_KEY;
  const baseUrl = "https://newsapi.org/v2/top-headlines?country=au";
  const url = category
    ? `${baseUrl}&category=${category}&apiKey=${apiKey}`
    : `${baseUrl}&apiKey=${apiKey}`;

  try {
    const newsApiResponse = await fetch(url);
    const newsData = await newsApiResponse.json();
    res.status(200).json(newsData);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
