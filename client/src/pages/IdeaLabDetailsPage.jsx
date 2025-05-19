import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StrategicOverview from "../components/StrategicOverview";
import ValidationScore from "../components/ValidationScore";
import MarketAnalysisCharts from "../components/MarketAnalysisCharts";
import MVPRoadmap from "../components/MVPRoadmap";
import LandingPagePreview from "../components/LandingPagePreview";
import FinancialAnalysisDisplay from "../components/FinancialAnalysisDisplay";
import ErrorDisplay from "../components/ErrorDisplay";
import LoadingOverlay from "../components/LoadingOverlay";

export default function IdeaLabDetailsPage() {
  const { id } = useParams();
  const [idealab, setIdeaLab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marketChartData, setMarketChartData] = useState(null);
  const [mvpRoadmap, setMvpRoadmap] = useState(null);
  const [landingPageContent, setLandingPageContent] = useState(null);
  const [financialData, setFinancialData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/idealab/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIdeaLab(data.idealab);
          // Process the output data if available
          if (data.idealab.output) {
            const output = data.idealab.output;
            // Try both possible keys for compatibility
            setMarketChartData(output.market_analysis || output.marketLandscape || null);
            setMvpRoadmap(output.mvp_roadmap || null);
            setLandingPageContent(output.landing_page || null);
            setFinancialData(output.financial_analysis || null);
          }
        } else {
          setError(data.error);
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!idealab) return <div>IdeaLab not found</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            {idealab.title}
          </h1>
          <p className="text-gray-500 text-lg mt-2">
            {idealab.idea}
          </p>
        </div>

        {/* Results Grid */}
        {idealab.output && (
          <div className="space-y-12">
            {/* Strategic Overview */}
            <div className="p-6 bg-gray-900/30 border border-white/10 rounded-lg">
              <StrategicOverview response={idealab.output} />
            </div>

            {/* Validation Score */}
            <div className="p-6 bg-gray-900/30 border border-white/10 rounded-lg">
              <ValidationScore response={idealab.output} />
            </div>

            {/* Market Analysis */}
            {marketChartData && (
              <div className="p-6 bg-gray-900/30 border border-white/10 rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">Market Analysis</h2>
                <MarketAnalysisCharts data={marketChartData} />
              </div>
            )}

            {/* MVP Roadmap */}
            {mvpRoadmap && (
              <div className="p-6 bg-gray-900/30 border border-white/10 rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">MVP Roadmap</h2>
                <MVPRoadmap roadmap={mvpRoadmap} />
              </div>
            )}

            {/* Landing Page Preview */}
            {landingPageContent && (
              <div className="p-6 bg-gray-900/30 border border-white/10 rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">Landing Page Preview</h2>
                <LandingPagePreview content={landingPageContent} />
              </div>
            )}

            {/* Financial Analysis */}
            {financialData && (
              <div className="p-6 bg-gray-900/30 border border-white/10 rounded-lg">
                <h2 className="text-2xl font-semibold mb-6">Financial Analysis</h2>
                <FinancialAnalysisDisplay data={financialData} />
              </div>
            )}
          </div>
        )}

        {/* Error Display */}
        <ErrorDisplay error={error} />

        {/* Loading Overlay */}
        <LoadingOverlay loading={loading} loadingMessage="Loading IdeaLab details..." />
      </div>
    </div>
  );
}
