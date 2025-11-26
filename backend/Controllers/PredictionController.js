const express = require('express');
const Prediction = require('../models/Prediction');
const predictionEngine = require('../services/predictionEngine');

const getPredictions = async (req, res) => {
    try {
        const predictions = await Prediction.find().sort({ createdAt: -1 }).limit(50);
        res.json({
            success: true,
            count: predictions.length,
            predictions
        });
    } catch(error) {
        console.error('Get predictions error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Failed to fetch predictions' 
        });
    }
};

const createPrediction = async (req, res) => {
    try {
        const { commodity, market, timeframe } = req.body;

        if (!commodity || !market) {
            return res.status(400).json({ 
                success: false,
                error: 'Commodity and market are required' 
            });
        }

        // Generate prediction using all services
        const predictionResult = await predictionEngine.generatePrediction(commodity, market);

        // Save to database
        const savedPrediction = await Prediction.create({
            commodity,
            market,
            timeframe,
            trend: predictionResult.trend,
            currentPrice: predictionResult.currentPrice,
            predictedPrice: predictionResult.predictedPrice,
            predictedChangePercent: predictionResult.predictedChangePercent,
            confidenceScore: predictionResult.confidenceScore,
            reasoning: predictionResult.reasoning,
            aiEnhanced: predictionResult.aiEnhanced,
            factors: predictionResult.factors,
            createdAt: new Date()
        });

        // Send response to frontend
        res.status(201).json({
            success: true,
            message: 'Prediction generated successfully',
            prediction: {
                commodity: savedPrediction.commodity,
                market: savedPrediction.market,
                timeframe: savedPrediction.timeframe,
                trend: savedPrediction.trend,
                currentPrice: savedPrediction.currentPrice,
                predictedPrice: savedPrediction.predictedPrice,
                predictedChangePercent: savedPrediction.predictedChangePercent,
                confidenceScore: savedPrediction.confidenceScore,
                reasoning: savedPrediction.reasoning,
                aiEnhanced: savedPrediction.aiEnhanced,
                factors: savedPrediction.factors,
                createdAt: savedPrediction.createdAt
            }
        });

    } catch (error) {
        console.error('Create prediction error:', error);
        res.status(500).json({ 
            success: false,
            error: error.message || 'Failed to create prediction' 
        });
    }
};

module.exports = {
    getPredictions,
    createPrediction
};
// Receives user requests (commodity, market)

// Calls all the services

// Combines results into final prediction

// Sends response back to frontend
