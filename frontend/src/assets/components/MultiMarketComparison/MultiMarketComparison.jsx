import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMarketData } from '../../hooks/useMarketData';
import MarketCard from './MarketCard';
import OpportunityHighlights from './OpportunityHighlights';
import { Scale, RefreshCw, AlertCircle } from 'lucide-react';

const MultiMarketComparison = () => {
  const [selectedMarkets, setSelectedMarkets] = useState(['maize', 'coffee', 'tea']);
  const { marketData, loading, error, refetch } = useMarketData(selectedMarkets);

  const availableMarkets = [
    { id: 'maize', name: 'Maize', category: 'Staple' },
    { id: 'coffee', name: 'Coffee', category: 'Export' },
    { id: 'tea', name: 'Tea', category: 'Export' },
    { id: 'beans', name: 'Beans', category: 'Staple' },
    { id: 'wheat', name: 'Wheat', category: 'Staple' },
    { id: 'tomatoes', name: 'Tomatoes', category: 'Vegetables' }
  ];

  const toggleMarket = (marketId) => {
    setSelectedMarkets(prev => 
      prev.includes(marketId) 
        ? prev.filter(id => id !== marketId)
        : [...prev, marketId]
    );
  };

  if (loading && marketData.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Scale className="w-5 h-5 text-purple-600" />
            Kenya Multi-Market Comparison
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            Real-time Kenyan commodity market analysis
          </p>
        </div>
        
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          {/* Refresh Button */}
          <button
            onClick={refetch}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          
          {/* Market Selector */}
          <div className="flex flex-wrap gap-2">
            {availableMarkets.map(market => (
              <button
                key={market.id}
                onClick={() => toggleMarket(market.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedMarkets.includes(market.id)
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {market.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Indicator */}
      <div className="flex items-center gap-2 mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-green-700 text-sm font-medium">Live Kenyan Market Data</span>
        <span className="text-green-600 text-xs">• Updates every 30 seconds</span>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-yellow-600" />
          <p className="text-yellow-700 text-sm">{error}</p>
        </div>
      )}

      {/* Opportunity Highlights */}
      <OpportunityHighlights markets={marketData} />

      {/* Market Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {marketData.map((market, index) => (
          <MarketCard 
            key={market.id} 
            market={market} 
            index={index}
          />
        ))}
      </div>

      {marketData.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          Select Kenyan markets to compare
        </div>
      )}

      {/* Data Source Info */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Data sourced from Kenya Market Intelligence • Prices in KES
        </p>
      </div>
    </motion.div>
  );
};

export default MultiMarketComparison;