// src/assets/pages/GeneratePrediction.jsx
import { useState } from "react";
import { createPrediction } from "../services/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown, Minus, Loader, X, BarChart3, ArrowRight, Zap, Shield, Calendar, MapPin, Package } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function GeneratePrediction() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    commodity: "",
    market: "",
    timeframe: "1 week"
  });

  const popularCommodities = [
    { value: "maize", label: "Maize", icon: "🌽" },
    { value: "wheat", label: "Wheat", icon: "🌾" },
    { value: "rice", label: "Rice", icon: "🍚" },
    { value: "coffee", label: "Coffee", icon: "☕" },
    { value: "beans", label: "Beans", icon: "🫘" },
    { value: "tomatoes", label: "Tomatoes", icon: "🍅" },
    { value: "sukuma", label: "Sukuma Wiki", icon: "🥬" },
    { value: "onions", label: "Onions", icon: "🧅" },
    { value: "potatoes", label: "Potatoes", icon: "🥔" },
    { value: "sugar", label: "Sugar", icon: "🍚" }
  ];

  const popularMarkets = [
    { value: "Nairobi", label: "Nairobi", region: "Central" },
    { value: "Mombasa", label: "Mombasa", region: "Coast" },
    { value: "Kisumu", label: "Kisumu", region: "Western" },
    { value: "Nakuru", label: "Nakuru", region: "Rift Valley" },
    { value: "Eldoret", label: "Eldoret", region: "Rift Valley" },
    { value: "Thika", label: "Thika", region: "Central" }
  ];

  const timeframes = [
    { value: "1 week", label: "1 Week", description: "Short-term forecast" },
    { value: "1 month", label: "1 Month", description: "Medium-term forecast" },
    { value: "3 months", label: "3 Months", description: "Long-term forecast" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.commodity || !formData.market) {
      toast.error("Please select both commodity and market");
      return;
    }

    setLoading(true);
    
    try {
      const res = await createPrediction(formData);
      setResult(res.data.prediction);
      toast.success("Prediction generated successfully!");
    } catch (err) {
      console.error("Prediction error:", err);
      const errorMessage = err.response?.data?.error || "Failed to generate prediction. Please try again.";
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  const handleNewPrediction = () => {
    setResult(null);
    setFormData({
      commodity: "",
      market: "",
      timeframe: "1 week"
    });
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

  // If we have results, show them
  if (result) {
    return (
      <div className="min-h-screen bg-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-12"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full px-4 py-2 mb-4"
              >
                <Zap className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-medium">Prediction Complete</span>
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Prediction Results
              </h1>
              <p className="text-gray-600 text-lg">Analysis for {result.commodity} in {result.market}</p>
            </div>
            <button 
              onClick={handleNewPrediction}
              className="bg-gray-100 hover:bg-gray-200 rounded-lg p-3 transition-colors group"
            >
              <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            </button>
          </motion.div>

          {/* Results Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Overview Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 capitalize mb-2">{result.commodity}</h2>
                    <p className="text-gray-600 text-lg">{result.market} Market</p>
                  </div>
                  <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${getTrendColor(result.trend)}`}>
                    {getTrendIcon(result.trend)}
                    <span className={`font-semibold capitalize`}>
                      {result.trend} Trend
                    </span>
                  </div>
                </div>
                
                {/* Market & Timeframe Info */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Market</p>
                      <p className="font-semibold text-gray-900">{result.market}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Timeframe</p>
                      <p className="font-semibold text-gray-900">{formData.timeframe}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Price Analysis */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
                  <BarChart3 className="w-6 h-6 text-gray-700" />
                  <span>Price Analysis</span>
                </h3>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center py-3">
                    <div>
                      <span className="text-gray-600 block">Current Price</span>
                      <span className="text-sm text-gray-500">Average market price</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900">KES {result.currentPrice}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-y border-gray-100">
                    <div>
                      <span className="text-gray-600 block">Predicted Price</span>
                      <span className="text-sm text-gray-500">Expected future price</span>
                    </div>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                      KES {result.predictedPrice}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3">
                    <div>
                      <span className="text-gray-600 block">Expected Change</span>
                      <span className="text-sm text-gray-500">Price movement</span>
                    </div>
                    <span className={`text-2xl font-bold ${
                      result.predictedChangePercent >= 0 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {result.predictedChangePercent >= 0 ? '+' : ''}{result.predictedChangePercent}%
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Confidence Score */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center justify-center space-x-3">
                  <Shield className="w-6 h-6 text-gray-700" />
                  <span>Confidence Score</span>
                </h3>
                
                <p className="text-gray-600 mb-6">How reliable this prediction is</p>
                
                <div className="relative inline-block mb-6">
                  <div 
                    className="radial-progress text-gray-900 border-4 border-gray-200" 
                    style={{
                      "--value": result.confidenceScore * 100, 
                      "--size": "8rem", 
                      "--thickness": "8px"
                    }}
                  >
                    <span className="text-2xl font-bold">{Math.round(result.confidenceScore * 100)}%</span>
                  </div>
                </div>
                
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                  result.confidenceScore > 0.7 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : result.confidenceScore > 0.5 
                    ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  <Shield className="w-4 h-4" />
                  <span className="font-semibold">
                    {result.confidenceScore > 0.7 ? 'High Reliability' : 
                     result.confidenceScore > 0.5 ? 'Moderate Reliability' : 'Low Reliability'}
                  </span>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <button 
                  onClick={handleNewPrediction}
                  className="w-full bg-white border border-gray-300 text-gray-900 px-6 py-4 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center space-x-3 group shadow-sm"
                >
                  <span>New Prediction</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <Link
                  to="/history"
                  className="w-full border border-gray-300 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center space-x-3"
                >
                  <span>View History</span>
                  <BarChart3 className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Form view when no results
  return (
    <div className="min-h-screen bg-white py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full px-4 py-2 mb-6"
          >
            <Zap className="w-4 h-4 text-white" />
            <span className="text-sm text-white font-medium">AI-powered predictions</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Generate Prediction
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get AI-powered price predictions for agricultural commodities
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Commodity Selection */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4 text-white" />
                  </div>
                  <span>Select Commodity</span>
                </label>
                <select 
                  value={formData.commodity}
                  onChange={(e) => handleInputChange('commodity', e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all appearance-none text-lg hover:border-gray-400 focus:bg-white"
                  required
                >
                  <option value="" className="text-gray-500">Choose a commodity...</option>
                  {popularCommodities.map(commodity => (
                    <option key={commodity.value} value={commodity.value} className="text-gray-900 bg-white">
                      {commodity.icon} {commodity.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Market Selection */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span>Select Market</span>
                </label>
                <select 
                  value={formData.market}
                  onChange={(e) => handleInputChange('market', e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all appearance-none text-lg hover:border-gray-400 focus:bg-white"
                  required
                >
                  <option value="" className="text-gray-500">Choose a market...</option>
                  {popularMarkets.map(market => (
                    <option key={market.value} value={market.value} className="text-gray-900 bg-white">
                      {market.label} ({market.region})
                    </option>
                  ))}
                </select>
              </div>

              {/* Timeframe Selection */}
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <span>Prediction Timeframe</span>
                </label>
                <select 
                  value={formData.timeframe}
                  onChange={(e) => handleInputChange('timeframe', e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all text-lg hover:border-gray-400 focus:bg-white"
                >
                  {timeframes.map(timeframe => (
                    <option key={timeframe.value} value={timeframe.value} className="text-gray-900 bg-white">
                      {timeframe.label} - {timeframe.description}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={loading || !formData.commodity || !formData.market}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 group text-lg shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <Loader className="w-6 h-6 animate-spin" />
                      <span>Generating Prediction...</span>
                    </>
                  ) : (
                    <>
                      <span>Generate Prediction</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}