const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({ 
    commodity: { type: String, required: true },
    market: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    predictedPrice: { type: Number, required: true },
    predictedChangePercent: { type: Number, required: true },
    confidenceScore: { type: Number, required: true },
    trend: { type: String, required: true, enum: ['up', 'down', 'stable'] },
    userInput: { 
        commodity: String,
        market: String,
        timeframe: String 
    },
    factors: {
        newsSentiment: { type: Number, default: 0 },
        weatherImpact: { type: Number, default: 0 },
        marketSentiment: { type: Number, default: 0 },
        fuelCostImpact: { type: Number, default: 0 },
        currencyImpact: { type: Number, default: 0 },
        aiAnalysis: { type: String, default: '' } // <- optional AI insight storage
    },
    reasoning: { type: String, default: '' }, // <- store AI reasoning directly
    aiEnhanced: { type: Boolean, default: false }, // <- marks if AI enhanced
    timestamp: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now }
});

const Prediction = mongoose.model('Prediction', PredictionSchema);

module.exports = Prediction;
