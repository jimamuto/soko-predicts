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
            ...predictionResult,
            userInput: { commodity, market, timeframe },
            createdAt: new Date()
        });

        // Send response to frontend
        res.status(201).json({
            success: true,
            message: 'Prediction generated successfully',
            prediction: savedPrediction
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