const axios = require('axios');

class MarketInsightsAI {
  constructor() {
    this.apiKey = process.env.GROQ_API_KEY;
    this.baseURL = 'https://api.groq.com/openai/v1/chat/completions';
  }

  async getMarketInsights() {
    if (!this.apiKey) {
      return this.getFallbackInsights();
    }

    try {
      const response = await axios.post(this.baseURL, {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `You are a Kenyan agricultural market expert. Provide 3 market insights in JSON format.
            Return exactly: {
              "insights": [
                {
                  "id": 1,
                  "commodity": "maize",
                  "market": "Nairobi",
                  "predictedPrice": "87.08",
                  "trend": "up",
                  "confidenceScore": 0.64,
                  "reasoning": "Increased demand from urban centers with stable supply",
                  "type": "price",
                  "urgency": "medium",
                  "timestamp": "${new Date().toISOString()}"
                }
              ]
            }`
          },
          {
            role: "user",
            content: "Generate 3 current market insights for Kenyan agricultural commodities with price predictions."
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 1000,
        temperature: 0.3
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      const data = JSON.parse(response.data.choices[0].message.content);
      return data.insights || this.getFallbackInsights();
      
    } catch (error) {
      console.error('Groq AI insights failed:', error.message);
      return this.getFallbackInsights();
    }
  }

  getFallbackInsights() {
    return [
      {
        id: 1,
        commodity: "maize",
        market: "Nairobi",
        predictedPrice: "87.08",
        trend: "up",
        confidenceScore: 0.64,
        reasoning: "Increased demand from urban centers with stable supply from recent harvests",
        type: "price",
        urgency: "medium",
        timestamp: new Date().toISOString()
      },
      {
        id: 2,
        commodity: "coffee",
        market: "Nakuru", 
        predictedPrice: "245.50",
        trend: "up",
        confidenceScore: 0.72,
        reasoning: "International demand rising due to quality improvements in Central region",
        type: "demand",
        urgency: "high",
        timestamp: new Date().toISOString()
      },
      {
        id: 3,
        commodity: "tomatoes",
        market: "Kisumu",
        predictedPrice: "65.30",
        trend: "down",
        confidenceScore: 0.58,
        reasoning: "Seasonal oversupply from Eastern Kenya farms affecting prices",
        type: "supply",
        urgency: "medium",
        timestamp: new Date().toISOString()
      }
    ];
  }
}

module.exports = new MarketInsightsAI();