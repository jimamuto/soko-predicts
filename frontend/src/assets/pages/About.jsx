import { motion } from "framer-motion";
import { BarChart3, Users, Target, Globe, Shield, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "AI-Powered Analytics",
      description: "Advanced machine learning algorithms analyze multiple data sources for precise price forecasting"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-Time Insights",
      description: "Live market data, weather patterns, and news sentiment combined for up-to-date predictions"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Trusted Accuracy",
      description: "Proven prediction models with transparent confidence scoring for reliable decision-making"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Market Coverage",
      description: "Comprehensive coverage of major Kenyan markets and agricultural commodities"
    }
  ];

  const team = [
    {
      name: "Data Science Team",
      role: "AI & Machine Learning",
      description: "Building sophisticated prediction models"
    },
    {
      name: "Market Analysts",
      role: "Agricultural Experts",
      description: "Domain expertise in commodity markets"
    },
    {
      name: "Development Team",
      role: "Technology & Platform",
      description: "Creating seamless user experiences"
    }
  ];

  const supportedCommodities = [
    'Maize', 'Wheat', 'Rice', 'Coffee', 'Beans', 
    'Tomatoes', 'Sukuma Wiki', 'Onions', 'Potatoes', 'Sugar',
    'Tea', 'Avocado', 'Mangoes', 'Bananas', 'Cassava'
  ];

  const supportedMarkets = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret',
    'Thika', 'Meru', 'Nyeri', 'Kitale', 'Malindi'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full px-4 py-2 mb-6"
          >
            <BarChart3 className="w-4 h-4 text-white" />
            <span className="text-sm text-white font-medium">About SokoPredicts</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            About SokoPredicts
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Revolutionizing Agricultural Commodity Trading with AI-Powered Predictions
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Empowering farmers, traders, and stakeholders with accurate, data-driven 
            price forecasts to make informed decisions in the agricultural market.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                SokoPredicts is dedicated to transforming agricultural commodity trading 
                through cutting-edge artificial intelligence and comprehensive data analysis. 
                We believe that access to reliable price predictions should be available to everyone 
                in the agricultural value chain.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                By combining real-time market data, weather patterns, news sentiment, 
                and economic indicators, we provide actionable insights that help our users 
                maximize profits and minimize risks in an increasingly volatile market.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-600">Markets Covered</div>
                  <div className="text-2xl font-bold text-gray-900">10+</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-600">Commodities</div>
                  <div className="text-2xl font-bold text-gray-900">15+</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-600">Data Sources</div>
                  <div className="text-2xl font-bold text-gray-900">5+</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
            >
              <Target className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-lg text-gray-600">
                To become the most trusted AI-powered prediction platform for agricultural 
                commodities in East Africa, driving economic growth and food security through 
                data-driven decision making.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our sophisticated platform combines multiple data streams and advanced algorithms 
              to deliver accurate price predictions.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Prediction Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
          >
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Prediction Process</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {["Data Collection", "Analysis", "Prediction", "Delivery"].map((step, idx) => (
                <div key={idx} className="space-y-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto text-lg font-bold text-white
                    ${idx % 2 === 0 ? "bg-gradient-to-br from-blue-500 to-blue-600" : "bg-gradient-to-br from-purple-500 to-purple-600"}`}
                  >
                    {idx + 1}
                  </div>
                  <h4 className="font-semibold text-gray-900">{step}</h4>
                  <p className="text-sm text-gray-600">
                    {{
                      0: "Gather real-time market, weather, and news data",
                      1: "AI processes multiple data sources simultaneously",
                      2: "Machine learning models generate price forecasts",
                      3: "Clear, actionable insights delivered to you"
                    }[idx]}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Commodities & Markets */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-8">
          {/* Commodities */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Supported Commodities</h3>
            <div className="flex flex-wrap gap-2">
              {supportedCommodities.map((c, i) => (
                <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-200">{c}</span>
              ))}
            </div>
          </motion.div>

          {/* Markets */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Covered Markets</h3>
            <div className="flex flex-wrap gap-2">
              {supportedMarkets.map((m, i) => (
                <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-200">{m}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Expertise</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Behind SokoPredicts is a dedicated team of experts committed to delivering 
              the most accurate and reliable predictions.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium inline-block mt-2">{member.role}</div>
                <p className="text-gray-600 mt-3 text-sm">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Make Smarter Decisions?</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers and traders who trust SokoPredicts for their 
            agricultural commodity price predictions.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/predict" className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center justify-center space-x-2 focus:outline-none">
              <span>Start Predicting Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/history" className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all focus:outline-none">
              View Predictions
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
