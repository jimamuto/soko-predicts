// src/assets/pages/PredictionsHistory.jsx
import { useEffect, useState } from "react";
import { getPredictions } from "../services/api";
import EmptyState from "../components/EmptyState";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Calendar, MapPin, Package, Filter, BarChart3, Download, RefreshCw, ArrowRight, Zap } from "lucide-react";
import toast from "react-hot-toast";

export default function PredictionsHistory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      const res = await getPredictions();
      setData(res.data.predictions || []);
    } catch (error) {
      console.error("Error fetching predictions:", error);
      toast.error("Failed to load predictions");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-5 h-5" />;
      case 'down': return <TrendingDown className="w-5 h-5" />;
      default: return <Minus className="w-5 h-5" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-50 border border-green-200';
      case 'down': return 'text-red-600 bg-red-50 border border-red-200';
      default: return 'text-gray-600 bg-gray-50 border border-gray-200';
    }
  };

  const filteredData = filter === 'all' 
    ? data 
    : data.filter(pred => pred.trend === filter);

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.timestamp) - new Date(a.timestamp);
      case 'oldest':
        return new Date(a.timestamp) - new Date(b.timestamp);
      case 'confidence':
        return b.confidenceScore - a.confidenceScore;
      case 'change':
        return Math.abs(b.predictedChangePercent) - Math.abs(a.predictedChangePercent);
      default:
        return 0;
    }
  });

  const stats = {
    total: data.length,
    rising: data.filter(p => p.trend === 'up').length,
    falling: data.filter(p => p.trend === 'down').length,
    stable: data.filter(p => p.trend === 'stable').length,
    avgConfidence: Math.round(data.reduce((acc, p) => acc + p.confidenceScore, 0) / data.length * 100) || 0
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-gray-900 mb-4"></div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Loading Predictions</h3>
          <p className="text-gray-600">Fetching your prediction history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full px-4 py-2 mb-6"
          >
            <BarChart3 className="w-4 h-4 text-white" />
            <span className="text-sm text-white font-medium">Prediction History</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Prediction History
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Track your commodity predictions and analyze market trends over time
          </motion.p>
        </div>
      </div>

      {/* Stats Overview */}
      {data.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 -mt-8 mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Predictions</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-2xl font-bold text-green-600">{stats.rising}</div>
              <div className="text-sm text-green-700">Rising Trends</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-2xl font-bold text-red-600">{stats.falling}</div>
              <div className="text-sm text-red-700">Falling Trends</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-2xl font-bold text-gray-600">{stats.stable}</div>
              <div className="text-sm text-gray-700">Stable Trends</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center shadow-sm">
              <div className="text-2xl font-bold text-blue-600">{stats.avgConfidence}%</div>
              <div className="text-sm text-blue-700">Avg Confidence</div>
            </div>
          </div>
        </div>
      )}

      {/* Controls Section */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-700" />
              <h3 className="font-semibold text-gray-900">Filter & Sort</h3>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {/* Trend Filter */}
              <div className="flex gap-2">
                <button 
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    filter === 'all' 
                      ? 'bg-gray-900 text-white border-gray-900' 
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                    filter === 'up' 
                      ? 'bg-green-600 text-white border-green-600' 
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setFilter('up')}
                >
                  <TrendingUp className="w-4 h-4" />
                  Rising
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                    filter === 'down' 
                      ? 'bg-red-600 text-white border-red-600' 
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => setFilter('down')}
                >
                  <TrendingDown className="w-4 h-4" />
                  Falling
                </button>
              </div>

              {/* Sort Options */}
              <select 
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all hover:border-gray-400"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="confidence">Highest Confidence</option>
                <option value="change">Largest Change</option>
              </select>

              {/* Refresh Button */}
              <button 
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:border-gray-400 transition-all flex items-center gap-2"
                onClick={fetchPredictions}
                disabled={loading}
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Predictions Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        {sortedData.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {sortedData.map((prediction, index) => (
              <motion.div
                key={prediction._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                {/* Header with Trend Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 capitalize text-lg">
                        {prediction.commodity}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {prediction.market}
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${getTrendColor(prediction.trend)}`}>
                    {getTrendIcon(prediction.trend)}
                    <span className="text-sm font-semibold capitalize">{prediction.trend}</span>
                  </div>
                </div>

                {/* Price Comparison */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-600">Current</span>
                    <span className="text-sm text-gray-600">Predicted</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">KES {prediction.currentPrice}</span>
                    <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                      KES {prediction.predictedPrice}
                    </span>
                  </div>
                  <div className="text-center mt-2">
                    <span className={`text-lg font-bold ${
                      prediction.predictedChangePercent >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {prediction.predictedChangePercent >= 0 ? '+' : ''}{prediction.predictedChangePercent}%
                    </span>
                  </div>
                </div>

                {/* Confidence & Date */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-900">
                      {Math.round(prediction.confidenceScore * 100)}% Confidence
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {new Date(prediction.timestamp).toLocaleDateString()}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                  <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:border-gray-400 transition-all flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                  <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all text-sm">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State Alternative */}
        {data.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="max-w-md mx-auto">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Predictions Yet</h3>
              <p className="text-gray-600 mb-6">
                Start generating predictions to build your market analysis history
              </p>
              <a 
                href="/predict" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all inline-flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Generate First Prediction
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}