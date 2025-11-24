const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const env = require('dotenv');
const predictionRoutes = require('./routes/prediction.routes');
env.config();


// Middleware
app.use(cors());
app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//routes
app.use('/api/predictions', predictionRoutes);


// Starts your server

// Connects to database

// Routes incoming requests