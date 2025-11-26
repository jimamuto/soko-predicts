// services/commodityAI.js
const axios = require('axios');

class CommodityAI {
  constructor() {
    this.apiKey = process.env.GROQ_API_KEY;
    this.isEnabled = !!this.apiKey;
    this.baseURL = 'https://api.groq.com/openai/v1/chat/completions';
  }

  async enhanceCommodityPrediction(commodity, market, factors, yourPrediction) {
    if (!this.isEnabled) {
      console.log('No API key - using smart AI rules');
      return this.smartRuleBasedAI(commodity, market, factors, yourPrediction);
    }

    try {
      console.log('Using Groq FREE AI...');
      
      const prompt = this.createGroqPrompt(commodity, market, factors, yourPrediction);
      
      const response = await axios.post(this.baseURL, {
        model: "llama-3.1-8b-instant", // UPDATED MODEL - CURRENT & FREE
        messages: [
          {
            role: "system", 
            content: "You are a Kenyan agricultural market expert. Provide concise commodity price analysis."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 120,
        temperature: 0.3
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 8000
      });

      const aiResponse = response.data.choices[0].message.content;
      console.log('✅ Groq AI Success:', aiResponse);
      
      return this.parseAIResponse(aiResponse, yourPrediction);
      
    } catch (error) {
      console.error('❌ Groq AI failed, using smart rules:', error.response?.data?.error?.message || error.message);
      return this.smartRuleBasedAI(commodity, market, factors, yourPrediction);
    }
  }

  createGroqPrompt(commodity, market, factors, yourPrediction) {
    return `
KENYAN COMMODITY ANALYSIS:
${commodity} in ${market}
Current: KES ${factors.priceData}
Predicted: ${yourPrediction.trend} ${yourPrediction.predictedChangePercent}%
Factors: Weather ${factors.weather}, Fuel KES ${factors.fuel}

Provide 1 sentence insight and confidence change (-0.1 to +0.1).

Format: INSIGHT|CONFIDENCE
Example: "Good rainfall supports supply|0.06"
    `;
  }

  // services/commodityAI.js - FIXED PARSING
parseAIResponse(aiText, originalPrediction) {
  try {
    console.log('Raw AI Response:', aiText);
    
    // FIXED: Better parsing for the format "insight|confidence"
    const parts = aiText.split('|');
    let insight = "AI market analysis applied";
    let confidenceChange = 0.05;

    if (parts.length >= 2) {
      // Take everything before the last | as insight
      insight = parts.slice(0, -1).join('|').trim();
      
      // Take the last part as confidence
      const confidencePart = parts[parts.length - 1].trim();
      confidenceChange = parseFloat(confidencePart) || 0.05;
      
      console.log('Parsed insight:', insight);
      console.log('Parsed confidence change:', confidenceChange);
    } else {
      // If no | found, use entire text as insight
      insight = aiText.trim();
    }

    // Validate confidence change
    if (confidenceChange < -0.1) confidenceChange = -0.1;
    if (confidenceChange > 0.1) confidenceChange = 0.1;

    const newConfidence = Math.max(0.3, Math.min(0.95, originalPrediction.confidenceScore + confidenceChange));

    return {
      ...originalPrediction,
      confidenceScore: Math.round(newConfidence * 100) / 100,
      reasoning: insight, // This is what shows in the frontend
      aiEnhanced: true,
      factors: {
        ...originalPrediction.factors,
        aiAnalysis: "Groq AI Market Intelligence"
      }
    };
  } catch (error) {
    console.log('AI parse failed, using rules');
    return originalPrediction;
  }
}

  smartRuleBasedAI(commodity, market, factors, prediction) {
    console.log('🏆 Using Smart Rule-Based AI...');
    
    const marketIntelligence = {
      // Commodity expertise
      commodities: {
        maize: { 
          baseBoost: 0.07,
          insight: "Maize prices influenced by Central Kenya rainfall and harvest cycles",
          factors: ['weather', 'season']
        },
        wheat: {
          baseBoost: 0.04,
          insight: "Wheat imports affected by international prices and Mombasa port logistics",
          factors: ['imports', 'currency', 'fuel']
        },
        rice: {
          baseBoost: 0.03, 
          insight: "Rice pricing sensitive to USD/KES rates and Asian export markets",
          factors: ['imports', 'currency']
        },
        tomatoes: {
          baseBoost: 0.08,
          insight: "Tomato supply varies with seasonal production in Eastern Kenya",
          factors: ['weather', 'local_supply']
        },
        sukuma: {
          baseBoost: 0.09,
          insight: "Sukuma wiki has reliable supply from local urban farming",
          factors: ['local_supply']
        },
        beans: {
          baseBoost: 0.06,
          insight: "Bean prices stable with consistent local production",
          factors: ['local_supply']
        },
        potatoes: {
          baseBoost: 0.07,
          insight: "Potato supply depends on Central and Rift Valley harvests", 
          factors: ['weather', 'local_supply']
        }
      },
      
      // Market intelligence
      markets: {
        Nairobi: { premium: 0.03, insight: "Major urban market with stable demand patterns" },
        Mombasa: { premium: -0.02, insight: "Port city with import-influenced pricing" },
        Kisumu: { premium: 0.02, insight: "Western market with local produce advantage" },
        Nakuru: { premium: 0.04, insight: "Agricultural hub with direct farm supply" },
        Eldoret: { premium: 0.03, insight: "Rift Valley market close to production zones" },
        Thika: { premium: 0.01, insight: "Industrial town with mixed supply chains" }
      }
    };

    const commodityData = marketIntelligence.commodities[commodity] || { 
      baseBoost: 0.05, 
      insight: "Standard commodity market analysis applied",
      factors: []
    };
    
    const marketData = marketIntelligence.markets[market] || { premium: 0, insight: "" };

    // Calculate intelligent confidence adjustment
    let confidenceBoost = commodityData.baseBoost + marketData.premium;
    
    // Factor-based adjustments
    if (factors) {
      // Fuel impact
      if (factors.fuel > 170 && commodityData.factors.includes('fuel')) {
        confidenceBoost -= 0.02;
      } else if (factors.fuel < 140 && commodityData.factors.includes('fuel')) {
        confidenceBoost += 0.01;
      }
      
      // Weather impact
      if (factors.weather && factors.weather.includes('good') && commodityData.factors.includes('weather')) {
        confidenceBoost += 0.02;
      } else if (factors.weather && factors.weather.includes('bad') && commodityData.factors.includes('weather')) {
        confidenceBoost -= 0.01;
      }
    }

    // Final confidence calculation
    const finalConfidence = Math.max(0.4, Math.min(0.92, prediction.confidenceScore + confidenceBoost));

    const reasoning = commodityData.insight + (marketData.insight ? `. ${marketData.insight}` : "");

    return {
      ...prediction,
      confidenceScore: Math.round(finalConfidence * 100) / 100,
      reasoning: reasoning,
      aiEnhanced: true,
      factors: {
        ...prediction.factors,
        aiAnalysis: "Smart Market Intelligence"
      }
    };
  }
}

module.exports = new CommodityAI();