export default async function handler(req, res) {
    const { method } = req;
  
    if (method === 'GET') {
      try {
        const newsApiResponse = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWSAPI_KEY}`);
        const newsData = await newsApiResponse.json();
        res.status(200).json(newsData);
      } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Failed to fetch news' });
      }
    } else {
      // Handle any requests other than GET
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  }