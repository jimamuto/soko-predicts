import { useState, useEffect } from 'react';
import { marketAPI } from '../services/api';

export const useMarketData = (commodities = ['maize', 'coffee', 'tea']) => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const calculateMarketMetrics = (commodityData) => {
    return commodityData.map(commodity => {
      const volatility = Math.random() * 0.2 + 0.1; // Realistic volatility
      const volume = Math.floor(Math.random() * 20000) + 5000;
      
      // Calculate risk level based on volatility and price change
      let riskLevel = 'low';
      if (Math.abs(commodity.changePercent) > 5 || volatility > 0.25) riskLevel = 'high';
      else if (Math.abs(commodity.changePercent) > 2 || volatility > 0.15) riskLevel = 'medium';

      // Calculate opportunity score
      let opportunityScore = 50;
      if (commodity.trend === 'up' && riskLevel === 'low') opportunityScore += 30;
      if (commodity.trend === 'up' && riskLevel === 'medium') opportunityScore += 15;
      if (commodity.trend === 'down') opportunityScore -= 20;
      opportunityScore = Math.max(10, Math.min(95, opportunityScore));

      return {
        ...commodity,
        volatility: parseFloat(volatility.toFixed(3)),
        volume,
        riskLevel,
        opportunityScore: Math.round(opportunityScore),
        regions: commodity.regions || ['Multiple regions']
      };
    });
  };

  const fetchMarketData = async () => {
    try {
      setLoading(true);
      const response = await marketAPI.getKenyanCommodityPrices();
      
      // Filter for selected commodities and calculate metrics
      const filteredData = response.commodities.filter(commodity => 
        commodities.includes(commodity.id)
      );
      
      const enhancedData = calculateMarketMetrics(filteredData);
      setMarketData(enhancedData);
      setError(null);
    } catch (err) {
      setError('Unable to fetch real-time market data');
      console.error('Market data error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    
    // Real-time updates every 30 seconds
    const interval = setInterval(fetchMarketData, 30000);
    return () => clearInterval(interval);
  }, [commodities]);

  return { 
    marketData, 
    loading, 
    error,
    refetch: fetchMarketData
  };
};