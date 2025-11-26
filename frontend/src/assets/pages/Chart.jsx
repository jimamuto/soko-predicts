import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Price Trends Over Time Line Chart
export const PriceTrendChart = ({ data }) => {
  const chartData = [
    { date: 'Jan', price: 45.2 },
    { date: 'Feb', price: 47.8 },
    { date: 'Mar', price: 52.1 },
    { date: 'Apr', price: 55.6 },
    { date: 'May', price: 58.9 },
    { date: 'Jun', price: 62.3 },
    { date: 'Jul', price: 65.8 },
    { date: 'Aug', price: 63.2 },
    { date: 'Sep', price: 59.7 },
    { date: 'Oct', price: 56.4 },
    { date: 'Nov', price: 53.1 },
    { date: 'Dec', price: 87.1 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Trends Over Time</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `KES ${value}`}
            />
            <Tooltip 
              formatter={(value) => [`KES ${value}`, 'Price']}
              labelFormatter={(label) => `Month: ${label}`}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#7c3aed' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

// Predicted vs Actual Price Comparison
export const PredictionAccuracyChart = ({ data }) => {
  const chartData = [
    { commodity: 'Maize', predicted: 87.1, actual: 85.3 },
    { commodity: 'Coffee', predicted: 245.5, actual: 238.2 },
    { commodity: 'Tomatoes', predicted: 65.3, actual: 68.7 },
    { commodity: 'Beans', predicted: 120.8, actual: 118.9 },
    { commodity: 'Wheat', predicted: 95.6, actual: 97.2 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Predicted vs Actual Prices</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="commodity" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `KES ${value}`}
            />
            <Tooltip 
              formatter={(value) => [`KES ${value}`, 'Price']}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar 
              dataKey="predicted" 
              fill="#8b5cf6" 
              name="Predicted"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="actual" 
              fill="#10b981" 
              name="Actual"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

// Confidence Score Radial Chart
export const ConfidenceRadialChart = ({ confidence = 72 }) => {
  const data = [
    { name: 'Confidence', value: confidence, fill: '#8b5cf6' },
    { name: 'Remaining', value: 100 - confidence, fill: '#f3f4f6' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Confidence Score</h3>
      <div className="h-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            innerRadius="70%" 
            outerRadius="100%" 
            data={data} 
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              minAngle={15}
              background
              clockWise
              dataKey="value"
              cornerRadius={10}
            />
            <text 
              x="50%" 
              y="50%" 
              textAnchor="middle" 
              dominantBaseline="middle"
              className="text-3xl font-bold"
              fill="#1f2937"
            >
              {confidence}%
            </text>
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-gray-600 text-sm mt-2">
        Prediction confidence level
      </p>
    </motion.div>
  );
};

// Market Share Pie Chart
export const MarketShareChart = () => {
  const data = [
    { name: 'Maize', value: 35, color: '#8b5cf6' },
    { name: 'Coffee', value: 25, color: '#10b981' },
    { name: 'Tomatoes', value: 20, color: '#f59e0b' },
    { name: 'Beans', value: 15, color: '#ef4444' },
    { name: 'Others', value: 5, color: '#6b7280' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Commodity Market Share</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Market Share']}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

// Performance Metrics Dashboard
export const PerformanceDashboard = () => {
  const metrics = [
    { label: 'Accuracy Rate', value: '94.2%', change: '+2.1%', positive: true },
    { label: 'Avg Confidence', value: '87.5%', change: '+1.3%', positive: true },
    { label: 'Response Time', value: '0.8s', change: '-0.2s', positive: true },
    { label: 'Coverage', value: '78%', change: '+5.2%', positive: true }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Model Performance</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-4 bg-gray-50 rounded-lg"
          >
            <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
            <div className="text-sm text-gray-600 mt-1">{metric.label}</div>
            <div className={`text-xs mt-1 ${
              metric.positive ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.change}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Interactive Insights Panel
export const InteractiveInsights = () => {
  const [selectedCommodity, setSelectedCommodity] = useState('maize');
  
  const commodities = {
    maize: { 
      name: 'Maize', 
      currentPrice: 85.3, 
      predictedPrice: 87.1, 
      confidence: 72,
      trend: 'up',
      data: [
        { month: 'Jan', price: 78.2 },
        { month: 'Feb', price: 80.1 },
        { month: 'Mar', price: 82.5 },
        { month: 'Apr', price: 83.9 },
        { month: 'May', price: 85.3 },
        { month: 'Jun', price: 87.1 }
      ]
    },
    coffee: {
      name: 'Coffee',
      currentPrice: 238.2,
      predictedPrice: 245.5,
      confidence: 85,
      trend: 'up', 
      data: [
        { month: 'Jan', price: 220.1 },
        { month: 'Feb', price: 225.8 },
        { month: 'Mar', price: 230.4 },
        { month: 'Apr', price: 235.1 },
        { month: 'May', price: 238.2 },
        { month: 'Jun', price: 245.5 }
      ]
    },
    tomatoes: {
      name: 'Tomatoes',
      currentPrice: 68.7,
      predictedPrice: 65.3,
      confidence: 58,
      trend: 'down',
      data: [
        { month: 'Jan', price: 72.1 },
        { month: 'Feb', price: 70.8 },
        { month: 'Mar', price: 69.4 },
        { month: 'Apr', price: 68.9 },
        { month: 'May', price: 68.7 },
        { month: 'Jun', price: 65.3 }
      ]
    }
  };

  const current = commodities[selectedCommodity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Interactive Commodity Analysis</h3>
        <div className="flex space-x-2">
          {Object.keys(commodities).map(commodity => (
            <button
              key={commodity}
              onClick={() => setSelectedCommodity(commodity)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCommodity === commodity
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {commodities[commodity].name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Price Performance</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={current.data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} tickFormatter={value => `KES ${value}`} />
                <Tooltip formatter={value => [`KES ${value}`, 'Price']} />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
            <div className="text-sm text-gray-600">Current Price</div>
            <div className="text-2xl font-bold text-gray-900">KES {current.currentPrice}</div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
            <div className="text-sm text-gray-600">Predicted Price</div>
            <div className="text-2xl font-bold text-gray-900">KES {current.predictedPrice}</div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4">
            <div className="text-sm text-gray-600">Confidence</div>
            <div className="text-2xl font-bold text-gray-900">{current.confidence}%</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Quick Stats Component
export const QuickStats = () => {
  const stats = [
    { label: 'Active Markets', value: '25', icon: '🏪' },
    { label: 'Price Alerts', value: '142', icon: '🔔' },
    { label: 'Daily Updates', value: '1.2K', icon: '📈' },
    { label: 'Traders Online', value: '89', icon: '👥' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Market Overview</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="text-center p-4 bg-gray-50 rounded-lg"
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};