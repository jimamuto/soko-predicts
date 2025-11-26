// server.js
const express = require('express');
const predictionRoutes = require('./routes/prediction.routes');
const newsRoutes = require('./routes/market-news');
const insightsRoutes = require('./routes/insights');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// MIDDLEWARE

// Parse JSON
app.use(express.json());

// CORS 
app.use(cors({
  origin: "*",
  credentials: true,
}));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('MongoDB connection error:', err));

// API ROUTES
app.use('/api/predictions', predictionRoutes);
app.use('/api', insightsRoutes);
app.use('/api', newsRoutes);
// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

if (process.env.NODE_ENV === "production") {
  // Path to the built React frontend
  const distPath = path.join(__dirname, "../frontend/dist");

  // Serve static files
  app.use(express.static(distPath));

  // SPA fallback 
  app.use((req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// Starts your server

// Connects to database

// Routes incoming requests