import { Link } from "react-router-dom";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function PredictionCard({ prediction }) {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-5 h-5" />;
      case "down":
        return <TrendingDown className="w-5 h-5" />;
      default:
        return <Minus className="w-5 h-5" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  const getConfidenceColor = (score) => {
    if (score > 0.7) return "text-green-600";
    if (score > 0.5) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-150">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 capitalize mb-0.5">
            {prediction.commodity}
          </h3>
          <p className="text-gray-500 text-sm">{prediction.market} Market</p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1 text-sm font-medium ${getTrendColor(
              prediction.trend
            )}`}
          >
            {getTrendIcon(prediction.trend)}
            <span className="capitalize">{prediction.trend}</span>
          </div>
        </div>
      </div>

      {/* Price Information */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-500 text-sm">Current Price</p>
          <p className="text-gray-900 font-semibold">KES {prediction.currentPrice}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Predicted Price</p>
          <p className="text-gray-900 font-semibold">KES {prediction.predictedPrice}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Expected Change</p>
          <p
            className={`font-semibold ${
              prediction.predictedChangePercent >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {prediction.predictedChangePercent >= 0 ? "+" : ""}
            {prediction.predictedChangePercent}%
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Confidence</p>
          <p className={`font-semibold ${getConfidenceColor(prediction.confidenceScore)}`}>
            {Math.round(prediction.confidenceScore * 100)}%
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100 text-sm text-gray-500">
        <span>{new Date(prediction.timestamp).toLocaleDateString()}</span>
        <Link
          to={`/prediction/${prediction.id}`}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
