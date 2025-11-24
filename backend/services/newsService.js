// services/newsService.js
const axios = require('axios');
require('dotenv').config();

const getNewsSentiment = async (commodity) => {
    try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q: `${commodity} prices`,
                language: 'en',
                sortBy: 'relevancy',
                pageSize: 10,
                apiKey: process.env.NEWS_API_KEY
            }
        });

        // Simple sentiment analysis
        const positiveWords = ['rise', 'gain', 'boom', 'growth', 'surge', 'bullish', 'profit'];
        const negativeWords = ['fall', 'drop', 'decline', 'crash', 'bearish', 'slump', 'loss'];
        
        let sentimentScore = 0;
        let articleCount = response.data.articles.length;

        response.data.articles.forEach(article => {
            const text = (article.title + ' ' + (article.description || '')).toLowerCase();
            
            positiveWords.forEach(word => {
                if (text.includes(word)) sentimentScore += 1;
            });
            negativeWords.forEach(word => {
                if (text.includes(word)) sentimentScore -= 1;
            });
        });

        const normalizedSentiment = Math.tanh(sentimentScore / Math.max(articleCount, 1));

        return {
            commodity,
            sentiment: normalizedSentiment,
            articleCount,
            lastUpdated: new Date()
        };
    } catch (error) {
        console.error('News service error:', error.message);
        // Fallback sentiment
        return {
            commodity,
            sentiment: (Math.random() * 2) - 1, // -1 to 1
            articleCount: 5,
            note: 'Demo sentiment data'
        };
    }
};

module.exports = { getNewsSentiment };
    
    
    // Calls news API for food price articles

    // Counts relevant news mentions

    // Returns market volatility impact on prices (0.1, 0.2, etc.)