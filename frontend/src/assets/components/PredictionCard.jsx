// src/assets/components/PredictionCard.jsx
export default function PredictionCard({ prediction }) {
  const trendColors = {
    up: 'text-success',
    down: 'text-error', 
    stable: 'text-warning'
  };

  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
      <div className="card-body">
        <div className="flex justify-between items-start">
          <h3 className="card-title capitalize">{prediction.commodity}</h3>
          <span className={`badge ${trendColors[prediction.trend]} badge-lg capitalize`}>
            {prediction.trend}
          </span>
        </div>
        
        <div className="space-y-2">
          <p><strong>Market:</strong> {prediction.market}</p>
          <p><strong>Current Price:</strong> ${prediction.currentPrice}</p>
          <p><strong>Predicted Price:</strong> ${prediction.predictedPrice}</p>
          <p><strong>Confidence:</strong> {Math.round(prediction.confidenceScore * 100)}%</p>
        </div>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm opacity-70">
            {new Date(prediction.timestamp).toLocaleDateString()}
          </span>
          <button className="btn btn-sm btn-outline">View Details</button>
        </div>
      </div>
    </div>
  );
}