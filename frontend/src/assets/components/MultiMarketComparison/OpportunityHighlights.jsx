import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, Target, ArrowUpRight } from 'lucide-react';

const OpportunityHighlights = ({ markets }) => {
  if (!markets.length) return null;

  // Find best and worst opportunities from real data
  const bestOpportunity = [...markets].sort((a, b) => b.opportunityScore - a.opportunityScore)[0];
  const highestRisk = [...markets].sort((a, b) => b.volatility - a.volatility)[0];
  const biggestGainer = [...markets].sort((a, b) => b.changePercent - a.changePercent)[0];
  const biggestLoser = [...markets].sort((a, b) => a.changePercent - b.changePercent)[0];

  const highlights = [
    {
      type: 'opportunity',
      market: bestOpportunity,
      title: 'Best Opportunity',
      description: `High potential returns`,
      icon: Target,
      color: 'text-green-600 bg-green-50 border-green-200'
    },
    {
      type: 'risk',
      market: highestRisk,
      title: 'Highest Risk',
      description: `Monitor closely`,
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-50 border-red-200'
    },
    {
      type: 'gainer',
      market: biggestGainer,
      title: 'Top Gainer',
      description: `Strong upward trend`,
      icon: TrendingUp,
      color: 'text-green-600 bg-green-50 border-green-200'
    },
    {
      type: 'loser',
      market: biggestLoser,
      title: 'Biggest Loser',
      description: `Consider exiting`,
      icon: TrendingDown,
      color: 'text-red-600 bg-red-50 border-red-200'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
    >
      {highlights.map((highlight, index) => (
        <motion.div
          key={highlight.type}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`p-3 rounded-lg border-2 ${highlight.color} cursor-pointer hover:scale-105 transition-transform`}
        >
          <div className="flex items-center gap-2 mb-2">
            <highlight.icon className="w-4 h-4" />
            <span className="text-sm font-semibold">{highlight.title}</span>
          </div>
          <div className="font-bold text-lg">{highlight.market.name}</div>
          <div className="text-xs opacity-75">{highlight.description}</div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs font-medium">
              KES {highlight.market.currentPrice.toLocaleString()}
            </span>
            <span className={`text-xs font-bold ${
              highlight.market.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {highlight.market.changePercent >= 0 ? '+' : ''}{highlight.market.changePercent.toFixed(1)}%
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default OpportunityHighlights;