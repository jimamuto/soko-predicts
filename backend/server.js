const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const predictionRoutes = require('./routes/prediction.routes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Routes
app.use('/api/predictions', predictionRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'SokoPredicts API is running',
    timestamp: new Date().toISOString()
  });
});

// PRODUCTION: Serve frontend in production
if (process.env.NODE_ENV === "production") {
  // Path to the built React frontend
  const distPath = path.join(__dirname, "../frontend/dist");

  // Serve static files
  app.use(express.static(distPath));

  // SPA fallback - serve index.html for all unknown routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// Starts your server

// Connects to database

// Routes incoming requests