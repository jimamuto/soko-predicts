// Component to show AI insights
const AIInsights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("/api/market-insights");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setInsights(data.insights || []);
        
      } catch (err) {
        console.error('Failed to fetch AI insights:', err);
        setError('Failed to load market insights');
        // Fallback to empty array if API fails
        setInsights([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4" />;
      case 'down': return <TrendingDown className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-50 border border-green-200';
      case 'down': return 'text-red-600 bg-red-50 border border-red-200';
      default: return 'text-gray-600 bg-gray-50 border border-gray-200';
    }
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'price': return <TrendingUp className="w-4 h-4" />;
      case 'weather': return <CloudRain className="w-4 h-4" />;
      case 'supply': return <BarChart3 className="w-4 h-4" />;
      case 'demand': return <TrendingUp className="w-4 h-4" />;
      case 'logistics': return <Truck className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-16 px-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              🧠 AI Market Insights
            </motion.h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Real-time commodity intelligence powered by Groq AI
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 bg-gray-100 rounded mb-2"></div>
                <div className="h-3 bg-gray-100 rounded mb-2"></div>
                <div className="h-3 bg-gray-100 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 px-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              🧠 AI Market Insights
            </motion.h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (!insights.length) {
    return (
      <section className="py-16 px-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              🧠 AI Market Insights
            </motion.h2>
            <p className="text-gray-600 mb-6">No market insights available at the moment</p>
            <Link
              to="/predict"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center space-x-2"
            >
              <span>Generate First Insight</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-3 bg-white rounded-full px-4 py-2 mb-4 shadow-sm">
            <Brain className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Powered by Groq AI</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AI Market Insights
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Real-time commodity intelligence and price predictions
          </p>
        </motion.div>

        {/* Insights Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getUrgencyColor(insight.urgency || 'medium')}`}>
                    {getInsightIcon(insight.type || 'price')}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 capitalize">{insight.commodity || 'Commodity'}</h3>
                    <p className="text-sm text-gray-500">{insight.market || 'Market'} Market</p>
                  </div>
                </div>
                <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${getTrendColor(insight.trend || 'stable')}`}>
                  {getTrendIcon(insight.trend || 'stable')}
                  <span className="font-medium capitalize">{insight.trend || 'stable'}</span>
                </div>
              </div>

              {/* Price and Confidence */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    KES {insight.predictedPrice || insight.currentPrice || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {insight.predictedPrice ? 'Predicted Price' : 'Current Price'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">
                    {Math.round((insight.confidenceScore || 0.5) * 100)}%
                  </div>
                  <div className="text-sm text-gray-500">Confidence</div>
                </div>
              </div>

              {/* AI Insight */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 text-sm text-purple-600 mb-2">
                  <Brain className="w-4 h-4" />
                  <span className="font-medium">AI Analysis</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {insight.reasoning || insight.insight || 'Market analysis in progress...'}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className={`text-xs px-2 py-1 rounded-full ${getUrgencyColor(insight.urgency || 'medium')}`}>
                  {(insight.urgency || 'medium')} priority
                </div>
                <div className="text-xs text-gray-500">
                  {insight.timestamp ? new Date(insight.timestamp).toLocaleTimeString() : 'Just now'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/predict"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Brain className="w-5 h-5" />
            <span>Get More AI Insights</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};