const priceService = require('./priceService');
const weatherService = require('./weatherService');
const newsService = require('./newsService');
const fuelService = require('./fuelService');
const currencyService = require('./currencyService');

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

        // Combine results into final prediction
        const prediction = combineResults(
            priceData, 
            weatherData, 
            newsSentiment, 
            fuelData, 
            currencyData,
            commodity,
            market
        );

        return prediction;

    } catch (error) {
        console.error('Prediction engine error:', error);
        throw new Error(`Prediction failed: ${error.message}`);
    }
};

// Calculate overall market sentiment from multiple factors
const calculateMarketSentiment = (news, weather, fuel, currency) => {
    let sentiment = 0;
    
    // News sentiment (40% weight) - what people are saying about prices
    if (news && news.sentiment) {
        sentiment += news.sentiment * 0.4;
    }
    
    // Weather impact (30% weight) - how weather affects market mood
    if (weather && weather.impact) {
        sentiment += weather.impact * 0.3;
    }
    
    // Fuel costs (20% weight) - economic pressure feeling
    if (fuel && fuel.petrol) {
        const fuelImpact = (fuel.petrol - 150) / 150;
        sentiment += fuelImpact * 0.2;
    }
    
    // Currency rates (10% weight) - import/export confidence
    if (currency && currency.rates && currency.rates.KES) {
        const currencyImpact = (currency.rates.KES - 150) / 150;
        sentiment += currencyImpact * 0.1;
    }
    
    return sentiment;
};

const combineResults = (price, weather, news, fuel, currency, commodity, market) => {
    // Base prediction starts with current price
    let basePrice = price.currentPrice || 100;
    let confidenceScore = 0.5;
    let trend = 'stable';
    let predictedChange = 0;

    // Factor weights (adjust based on your commodity)
    const weights = {
        news: 0.3,
        weather: 0.25,
        fuel: 0.2,
        currency: 0.15,
        technical: 0.1
    };

    // News sentiment impact
    if (news && news.sentiment) {
        predictedChange += news.sentiment * weights.news * 0.1; // ±10% max from news
        confidenceScore += Math.abs(news.sentiment) * 0.1;
    }

    // Weather impact
    if (weather && weather.impact) {
        predictedChange += weather.impact * weights.weather * 0.08; // ±8% max from weather
        confidenceScore += weather.impact * 0.15;
    }

    // Fuel cost impact (higher fuel = higher transport costs = higher prices)
    if (fuel && fuel.petrol) {
        const baseFuelPrice = 150; // Baseline fuel price in KES
        const currentFuelPrice = fuel.petrol;
        
        // Calculate fuel impact: 10% fuel price increase = 2% food price increase
        const fuelImpact = (currentFuelPrice - baseFuelPrice) / baseFuelPrice * 0.2;
        predictedChange += fuelImpact * weights.fuel;
        
        // Add to confidence if we have real fuel data
        if (fuel.isRealData) {
            confidenceScore += 0.05;
        }
    }

    // Currency impact (weaker Kenyan Shilling = higher import prices)
    if (currency && currency.rates) {
        const baseExchangeRate = 150; // Baseline USD to KES
        const currentExchangeRate = currency.rates.KES || baseExchangeRate;
        
        // Weaker shilling (higher KES per USD) = higher import costs
        const currencyImpact = (currentExchangeRate - baseExchangeRate) / baseExchangeRate * 0.3;
        predictedChange += currencyImpact * weights.currency;
    }

    // Commodity-specific adjustments
    const commodityFactors = {
        'maize': 1.0,    // Standard volatility
        'wheat': 1.2,    // More volatile (imported)
        'rice': 1.3,     // Highly volatile (imported)
        'tomatoes': 0.8, // Less volatile (local)
        'sukuma': 0.7,   // Less volatile (very local)
        'onions': 0.9,   // Moderate volatility
        'potatoes': 0.8  // Less volatile
    };
    
    const commodityFactor = commodityFactors[commodity] || 1.0;
    predictedChange = predictedChange * commodityFactor;

    // Determine final trend and price
    const predictedPrice = basePrice * (1 + predictedChange);
    
    if (predictedChange > 0.02) trend = 'up';
    else if (predictedChange < -0.02) trend = 'down';
    else trend = 'stable';

    // Calculate individual factor impacts for transparency
    const factors = {
        newsSentiment: news && news.sentiment ? news.sentiment * weights.news * 0.1 : 0,
        weatherImpact: weather && weather.impact ? weather.impact * weights.weather * 0.08 : 0,
        marketSentiment: calculateMarketSentiment(news, weather, fuel, currency), 
        fuelCostImpact: fuel && fuel.petrol ? ((fuel.petrol - 150) / 150 * 0.2 * weights.fuel) : 0,
        currencyImpact: currency && currency.rates ? ((currency.rates.KES - 150) / 150 * 0.3 * weights.currency) : 0
    };

    return {
        commodity,
        market,
        currentPrice: basePrice,
        predictedPrice: Math.round(predictedPrice * 100) / 100,
        predictedChangePercent: Math.round(predictedChange * 10000) / 100, // In percentage
        trend,
        confidenceScore: Math.min(Math.round(confidenceScore * 100) / 100, 0.95),
        timestamp: new Date(),
        factors: factors,
        dataSources: {
            price: price.source || 'Unknown',
            weather: weather.source || 'Unknown',
            news: news.source || 'Unknown',
            fuel: fuel.source || 'Unknown',
            currency: currency.source || 'Unknown'
        },
        lastUpdated: new Date()
    };
};

module.exports = { generatePrediction };