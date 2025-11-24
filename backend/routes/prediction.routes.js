
const express = require('express');
const router = express.Router();
const {createPrediction,getPredictions} = require('../Controllers/PredictionController');

router.get('/health', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Predictions API is working!',
        timestamp: new Date().toISOString()
    });
});
//router for asking for  predictions
router.post('/predict',createPrediction);

//router for getting predictions
router.get('/get-predictions',getPredictions);



module.exports = router;
