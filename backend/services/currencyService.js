// services/currencyService.js
const axios = require('axios');
require('dotenv').config();

const getExchangeRates = async (baseCurrency = 'USD') => {
    try {
        // Using free ExchangeRate-API
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        
        return {
            baseCurrency,
            rates: response.data.rates,
            lastUpdated: new Date()
        };
    } catch (error) {
        console.error('Currency service error:', error.message);
        // Fallback to hardcoded rates
        return {
            baseCurrency,
            rates: { USD: 1, EUR: 0.85, GBP: 0.73, KES: 110.5 },
            lastUpdated: new Date(),
            note: 'Fallback data'
        };
    }
};

module.exports = { getExchangeRates };


// Calls exchange rate API

// Tracks USD to KES rates

// Returns currency impact on import prices