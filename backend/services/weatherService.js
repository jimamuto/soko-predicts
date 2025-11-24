const axios = require('axios');
require('dotenv').config();

const getWeatherData = async (region = 'Nairobi') => {
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: region,
                appid: process.env.OPENWEATHER_API_KEY,
                units: 'metric'
            }
        });

        const weather = response.data;
        
        return {
            region,
            temperature: weather.main.temp,
            conditions: weather.weather[0].main,
            humidity: weather.main.humidity,
            pressure: weather.main.pressure,
            windSpeed: weather.wind.speed,
            impact: calculateWeatherImpact(weather),
            lastUpdated: new Date()
        };
    } catch (error) {
        console.error('Weather service error:', error.message);
        // Fallback weather data 
        const demoConditions = ['Clear', 'Clouds', 'Rain', 'Thunderstorm', 'Drizzle'];
        const randomCondition = demoConditions[Math.floor(Math.random() * demoConditions.length)];
        
        return {
            region,
            temperature: 22 + Math.random() * 10, // Kenyan temp range
            conditions: randomCondition,
            humidity: 50 + Math.random() * 40,
            impact: Math.random() * 0.3 + 0.1, // 10% to 40% impact
            note: 'Demo weather data'
        };
    }
};

const calculateWeatherImpact = (weather) => {
    let impact = 0;
    const condition = weather.weather[0].main;
    const temp = weather.main.temp;
    const humidity = weather.main.humidity;
    const windSpeed = weather.wind.speed;
    
    // WEATHER CONDITION IMPACTS
    if (condition === 'Rain') impact += 0.25;          // Rain = transport delays
    if (condition === 'Thunderstorm') impact += 0.35;  // Storms = major disruptions
    if (condition === 'Drizzle') impact += 0.15;       // Light rain = minor delays
    if (condition === 'Clouds') impact += 0.05;        // Cloudy = slight transport slowdown
    
    // TEMPERATURE IMPACTS (Kenya-specific ranges)
    if (temp > 32) impact += 0.15;                     // Very hot = spoilage risk
    if (temp > 28 && temp <= 32) impact += 0.08;       // Hot = moderate spoilage risk
    if (temp < 15) impact += 0.10;                     // Cold = preservation helps
    
    // HUMIDITY IMPACTS
    if (humidity > 75) impact += 0.12;                 // High humidity = faster spoilage
    if (humidity < 30) impact += 0.05;                 // Low humidity = better preservation
    
    // WIND IMPACTS
    if (windSpeed > 6) impact += 0.08;                 // Strong winds = transport issues
    
    // COMBINATION EFFECTS
    if (condition === 'Rain' && temp > 30) impact += 0.10;  // Hot rain = worst for perishables
    if (condition === 'Clouds' && humidity > 80) impact += 0.06; // Humid cloudy = moderate risk
    
    // BASE IMPACT - 
    impact += 0.02;
    
    return Math.min(Math.max(impact, 0.02), 0.8); // Keep between 2% and 80%
};

// Helper function to get weather impact explanation
const getImpactExplanation = (weatherData) => {
    const explanations = [];
    const condition = weatherData.conditions;
    const temp = weatherData.temperature;
    const humidity = weatherData.humidity;
    
    if (condition === 'Rain') explanations.push('Rain causing transport delays');
    if (condition === 'Thunderstorm') explanations.push('Storms disrupting supply chains');
    if (condition === 'Drizzle') explanations.push('Light rain slowing deliveries');
    if (temp > 32) explanations.push('High temperatures increasing spoilage risk');
    if (humidity > 75) explanations.push('High humidity affecting food preservation');
    if (weatherData.windSpeed > 6) explanations.push('Strong winds impacting transport');
    
    return explanations.length > 0 ? explanations : ['Normal weather conditions'];
};

module.exports = { 
    getWeatherData,
    getImpactExplanation 
};