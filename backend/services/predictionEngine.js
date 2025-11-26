// predictionEngine.js
const priceService = require('./priceService');
const weatherService = require('./weatherService');
const newsService = require('./newsService');
const fuelService = require('./fuelService');
const currencyService = require('./currencyService');
const commodityAI = require('./commodityAI'); // NEW AI SERVICE

const generatePrediction = async (commodity, market) => {
    try {
        console.log(`Generating prediction for ${commodity} in ${market}...`);

        // Call all services in parallel
        const [priceData, weatherData, newsSentiment, fuelData, currencyData] = await Promise.all([
            priceService.getPriceData(commodity, market),
            weatherService.getWeatherData(market),
            newsService.getNewsSentiment(commodity),
            fuelService.getFuelPrices(),
            currencyService.getExchangeRates('USD')
        ]);

        // Check for service errors
        const servicesWithErrors = [priceData, weatherData, newsSentiment, fuelData, currencyData]
            .filter(service => service && service.error);
        
        if (servicesWithErrors.length > 2) {
            throw new Error(`Multiple services failed: ${servicesWithErrors.map(s => s.error).join(', ')}`);
        }

        // Combine results into initial prediction
        let prediction = combineResults(
            priceData, 
            weatherData, 
            newsSentiment, 
            fuelData, 
            currencyData,
            commodity,
            market
        );

        // Enhance with AI
        const factors = {
            priceData: priceData.currentPrice,
            weather: weatherData.condition,
            news: newsSentiment.sentiment,
            fuel: fuelData.petrol,
            currency: currencyData.rates?.KES
        };

        const aiResult = await commodityAI.enhanceCommodityPrediction(
            commodity, market, factors, prediction
        );

        // Merge AI results into prediction
        prediction = {
            ...prediction,
            reasoning: aiResult.reasoning || '',       // AI insight text
            aiEnhanced: true,
            factors: {
                ...prediction.factors,
                aiAnalysis: aiResult.reasoning || ''
            }
        };

        return prediction;

    } catch (error) {
        console.error('Prediction engine error:', error);
        throw new Error(`Prediction failed: ${error.message}`);
    }
};

// Calculate overall market sentiment from multiple factors
const calculateMarketSentiment = (news, weather, fuel, currency) => {
    let sentiment = 0;
    
    if (news && news.sentiment) sentiment += news.sentiment * 0.4;
    if (weather && weather.impact) sentiment += weather.impact * 0.3;
    if (fuel && fuel.petrol) sentiment += ((fuel.petrol - 150) / 150) * 0.2;
    if (currency && currency.rates && currency.rates.KES) sentiment += ((currency.rates.KES - 150) / 150) * 0.1;
    
    return sentiment;
};

const combineResults = (price, weather, news, fuel, currency, commodity, market) => {
    let basePrice = price.currentPrice || 100;
    let confidenceScore = 0.5;
    let trend = 'stable';
    let predictedChange = 0;

    const weights = { news: 0.3, weather: 0.25, fuel: 0.2, currency: 0.15, technical: 0.1 };

    if (news && news.sentiment) {
        predictedChange += news.sentiment * weights.news * 0.1;
        confidenceScore += Math.abs(news.sentiment) * 0.1;
    }
    if (weather && weather.impact) {
        predictedChange += weather.impact * weights.weather * 0.08;
        confidenceScore += weather.impact * 0.15;
    }
    if (fuel && fuel.petrol) {
        const fuelImpact = (fuel.petrol - 150) / 150 * 0.2;
        predictedChange += fuelImpact * weights.fuel;
        if (fuel.isRealData) confidenceScore += 0.05;
    }
    if (currency && currency.rates) {
        const currencyImpact = ((currency.rates.KES - 150) / 150) * 0.3;
        predictedChange += currencyImpact * weights.currency;
    }

    const commodityFactors = {
        maize: 1.0, wheat: 1.2, rice: 1.3,
        tomatoes: 0.8, sukuma: 0.7, onions: 0.9, potatoes: 0.8
    };
    const commodityFactor = commodityFactors[commodity] || 1.0;
    predictedChange *= commodityFactor;

    const predictedPrice = basePrice * (1 + predictedChange);
    
    if (predictedChange > 0.02) trend = 'up';
    else if (predictedChange < -0.02) trend = 'down';

    const factors = {
        newsSentiment: news?.sentiment ? news.sentiment * weights.news * 0.1 : 0,
        weatherImpact: weather?.impact ? weather.impact * weights.weather * 0.08 : 0,
        marketSentiment: calculateMarketSentiment(news, weather, fuel, currency),
        fuelCostImpact: fuel?.petrol ? ((fuel.petrol - 150) / 150 * 0.2 * weights.fuel) : 0,
        currencyImpact: currency?.rates ? ((currency.rates.KES - 150) / 150 * 0.3 * weights.currency) : 0
    };

    return {
        commodity,
        market,
        currentPrice: basePrice,
        predictedPrice: Math.round(predictedPrice * 100) / 100,
        predictedChangePercent: Math.round(predictedChange * 10000) / 100,
        trend,
        confidenceScore: Math.min(Math.round(confidenceScore * 100) / 100, 0.95),
        timestamp: new Date(),
        factors,
        dataSources: {
            price: price.source || 'Unknown',
            weather: weather.source || 'Unknown',
            news: news.source || 'Unknown',
            fuel: fuel.source || 'Unknown',
            currency: currency.source || 'Unknown'
        },
        lastUpdated: new Date(),
        aiEnhanced: false // will be overwritten by AI merge above
    };
};

module.exports = { generatePrediction };
