const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/market-news', async (req, res) => {
  try {
    // You can integrate with real news APIs here:
    // - Alpha Vantage
    // - NewsAPI
    // - Financial Modeling Prep
    // - Or scrape reputable sources
    
    const news = await getRealMarketNews();
    res.json({ news });
  } catch (error) {
    console.error('News fetch failed:', error);
    res.json({ news: [] }); // Return empty, frontend will use mock data
  }
});

const getRealMarketNews = async () => {
  // Example with NewsAPI (get free API key from newsapi.org)
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=commodity+market+kenya&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`);
    
    return response.data.articles.slice(0, 8).map(article => ({
      id: Math.random(),
      title: article.title,
      commodity: extractCommodity(article.title),
      region: 'Kenya',
      impact: 'medium',
      trend: 'volatile', 
      price: (Math.random() * 200 + 50).toFixed(2),
      timestamp: 'Recently',
      type: 'news',
      urgency: 'medium',
      source: article.source.name,
      verified: true,
      url: article.url
    }));
  } catch (error) {
    return []; // Fallback to empty
  }
};

const extractCommodity = (title) => {
  const commodities = ['maize', 'coffee', 'tea', 'wheat', 'beans', 'tomatoes'];
  const found = commodities.find(commodity => title.toLowerCase().includes(commodity));
  return found ? found.charAt(0).toUpperCase() + found.slice(1) : 'General';
};

module.exports = router;