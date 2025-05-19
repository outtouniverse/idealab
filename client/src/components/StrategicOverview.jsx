import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { motion } from "framer-motion";
import {
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Target,
  DollarSign,
  Shield,
  ChartBar,
} from "lucide-react";

function StrategicOverview({ response }) {
  return (
    <div className="bg-gray-900/30 border border-white/10 p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6">
        Strategic{" "}
        <span className="text-white italic font-thin font-['Voyage_Bold']">
          Overview
        </span>
      </h2>

      <div className="space-y-8">
        {/* Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-300 mb-4">
              Summary
            </h3>
            <p className="text-gray-400 leading-relaxed">{response.summary}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(response.dataHighlights).map(([key, value]) => (
              <div
                key={key}
                className="bg-gray-800/50 p-4 rounded-lg border border-white/10"
              >
                <h4 className="text-sm font-semibold text-gray-400 uppercase mb-2">
                  {key}
                </h4>
                <p className="text-2xl font-bold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Market Analysis */}
        <div>
          <h3 className="text-xl font-semibold text-gray-300 mb-6">
            Market Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
              <h4 className="text-lg font-semibold text-gray-300 mb-4">
                Market Size
              </h4>
              <p className="text-gray-400">
                {response.marketLandscape.marketSize}
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
              <h4 className="text-lg font-semibold text-gray-300 mb-4">
                Growth Trends
              </h4>
              <p className="text-gray-400">
                {response.marketLandscape.growthTrends}
              </p>
            </div>
          </div>
        </div>

        {/* Actionable Steps Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Actionable Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {response.actionableSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-800/50 rounded-2xl flex items-center gap-4"
              >
                <div className="w-8 h-8 bg-green-600/20 text-white p-3 py-1 font-bold rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <p className="text-gray-700 dark:text-gray-300">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Risk Assessment Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Risk Assessment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {response.marketLandscape.challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-800/50 rounded-2xl flex items-center gap-4"
              >
                <AlertCircle className="w-5 h-5 text-amber-600/20 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">{challenge}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Revenue Models Section */}
        <div className="mb-8 ">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Revenue Models
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {response.potentialBusinessModels.revenueModels.map(
              (model, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-gray-800/50 rounded-2xl"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="w-5 h-5 text-black dark:text-white" />
                    <h4 className="font-semibold text-black dark:text-white">
                      Revenue Stream {index + 1}
                    </h4>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{model}</p>
                </motion.div>
              )
            )}
          </div>
        </div>

        {/* Competitive Landscape & Opportunities */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Competitive Landscape & Opportunities
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Competitors (Direct & Indirect) */}
            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.5 8.25a1.5 1.5 0 013 0v4.5a1.5 1.5 0 01-3 0v-4.5zm6 0a1.5 1.5 0 013 0V15a1.5 1.5 0 01-3 0v-4.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Direct Competitors
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {response.competitorInsights.directCompetitors.map(
                    (competitor, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {competitor}
                          </span>
                          {/* Placeholder for competitor logo/icon */}
                          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            {/* Replace with actual logo/icon */}
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {/* e.g., C1 */}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 mr-2"
                  >
                    <path d="M9.375 3a1.875 1.875 0 000 3.75h1.875v4.5H3.375A1.875 1.875 0 011.5 9.375c0-.414.11-.789.297-1.102l3.303-5.78A1.875 1.875 0 016.975 1.5h5.25c.921 0 1.702.57 2.052 1.372l1.948 4.546c.07.164.155.32.252.469v.013l3-5.25a1.875 1.875 0 00-1.757-2.906h-5.54l-1.973 4.6h8.47a1.875 1.875 0 001.875-1.875V9A1.875 1.875 0 0019.125 7.125H9.375V3zM11.25 12.75h10.5a.375.375 0 01.375.375v9a.375.375 0 01-.375.375h-10.5a.375.375 0 01-.375-.375v-9a.375.375 0 01.375-.375zM3 15.375h6v4.5H3v-4.5z" />
                  </svg>
                  Indirect Competitors
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {response.competitorInsights.indirectCompetitors.map(
                    (competitor, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="bg-white dark:bg-gray-900 p-4  rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {competitor}
                          </span>
                          {/* Placeholder for competitor logo/icon */}
                          <div className="w-8 h-8 rounded-full px-4 py-1 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {/* e.g., I1 */}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Market Gaps & Opportunities */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
            >
              <h4 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 6a1.5 1.5 0 011.5 1.5v4.5a1.5 1.5 0 01-3 0v-4.5A1.5 1.5 0 0112 6zm-1.5 9a1.5 1.5 0 003 0v-.75a.75.75 0 011.5 0v.75a3 3 0 01-6 0v-.75c0-.414.336-.75.75-.75h.75z"
                    clipRule="evenodd"
                  />
                </svg>
                Market Gaps & Opportunities
              </h4>
              <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed">
                {response.competitorInsights.gapsInSolutions}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Next Steps & Recommendations Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Next Steps & Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-gray-800/50 rounded-2xl"
            >
              <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-400 mb-4">
                Key Recommendations
              </h4>
              <ul className="space-y-3">
                {response.keyInsights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {insight}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-gray-800/50 rounded-2xl"
            >
              <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-400 mb-4">
                Monetization Opportunities
              </h4>
              <ul className="space-y-3">
                {response.potentialBusinessModels.monetizationOpportunities.map(
                  (opportunity, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {opportunity}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StrategicOverview;
