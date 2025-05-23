import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle, Lightbulb } from "lucide-react";

function ValidationScore({ response }) {
  const { feasibilityScore, feasibilityRecommendations } = response.feasibility;
  const scoreColor = feasibilityScore < 50 ? "text-red-400" : "text-green-400";

  return (
    <div className="bg-gray-900/30 border border-white/10 p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6">
        Validation{" "}
        <span className="text-white italic font-thin font-['Voyage_Bold']">
          Score
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Score Display */}
        <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
          <h3 className="text-xl font-semibold text-gray-300 mb-4">
            Feasibility Score
          </h3>
          <div className="flex items-center gap-4">
            <div
              className={`text-6xl font-thin italic font-['Voyage_Bold'] ${scoreColor}`}
            >
              {feasibilityScore}%
            </div>
            <div className="text-gray-400">
              {feasibilityScore < 50 ? "Needs Improvement" : "Promising"}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
          <h3 className="text-xl font-semibold text-gray-300 mb-4">
            Recommendations
          </h3>
          <ul className="space-y-3">
            {feasibilityRecommendations.map((insight, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-400">{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ValidationScore;
