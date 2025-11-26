import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, MapPin, Clock } from 'lucide-react';

const MarketCard = ({ market, index }) => {
  const isPositive = market.trend === 'up';
  const riskColor = {
    high: 'text-red-600 bg-red-50 border-red-200',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    low: 'text-green-600 bg-green-50 border-green-200'
  }[market.riskLevel];

  const opportunityColor = market.opportunityScore > 70 ? 'bg-green-100 text-green-800' :
                          market.opportunityScore > 40 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 group cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900 text-lg group-hover:text-purple-600 transition-colors">
            {market.name}
          </h4>
          <div className="flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500">{market.regions[0]}</span>
          </div>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${riskColor} border`}>
          <AlertTriangle className="w-3 h-3" />
          {market.riskLevel.toUpperCase()}
        </div>
      </div>

      {/* Price and Change */}
      <div className="mb-4">
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-gray-900">
            KES {market.currentPrice.toLocaleString()}
          </span>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
            isPositive 
              ? 'text-green-600 bg-green-50' 
              : 'text-red-600 bg-red-50'
          }`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{isPositive ? '+' : ''}{market.changePercent.toFixed(1)}%</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
          <Clock className="w-3 h-3" />
          <span>Updated: {new Date(market.lastUpdated).toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-gray-500">Volume</div>
          <div className="font-semibold text-gray-900">{market.volume.toLocaleString()}</div>
        </div>
        <div>
          <div className="text-gray-500">Volatility</div>
          <div className="font-semibold text-gray-900">{(market.volatility * 100).toFixed(1)}%</div>
        </div>
        <div className="col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Opportunity Score</span>
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${opportunityColor}`}>
              {market.opportunityScore}/100
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div 
              className={`h-2 rounded-full ${
                market.opportunityScore > 70 ? 'bg-green-500' :
                market.opportunityScore > 40 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${market.opportunityScore}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
        <button className="flex-1 bg-purple-600 text-white text-xs py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
          View Details
        </button>
        <button className="flex-1 border border-gray-300 text-gray-700 text-xs py-2 rounded-lg font-medium hover:border-gray-400 transition-colors">
          Set Alert
        </button>
      </div>
    </motion.div>
  );
};

export default MarketCard;