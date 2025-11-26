// routes/insights.js
const express = require('express');
const router = express.Router();
const marketInsightsAI = require('../services/marketInsightsAI');

router.get('/market-insights', async (req, res) => {
  try {
    const insights = await marketInsightsAI.getMarketInsights();
    res.json({ insights });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch market insights' });
  }
});

module.exports = router;