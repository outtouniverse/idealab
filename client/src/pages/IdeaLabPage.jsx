// pages/IdeaLabPage.jsx

import { useState, useRef, useEffect } from "react";
import { ThemeProvider } from "../components/ui/theme-provider";
// import Sidebar from "../components/Sidebar"; // No longer needed, App.jsx handles layout
// import TopBar from "../components/TopBar";   // No longer needed
import IdeaInputForm from "../components/IdeaInputForm";
import StrategicOverview from "../components/StrategicOverview";
import ValidationScore from "../components/ValidationScore";
import MarketAnalysisCharts from "../components/MarketAnalysisCharts";
import MVPRoadmap from "../components/MVPRoadmap";
import LandingPagePreview from "../components/LandingPagePreview";
import FinancialAnalysisDisplay from "../components/FinancialAnalysisDisplay";
import ErrorDisplay from "../components/ErrorDisplay";
import LoadingOverlay from "../components/LoadingOverlay";

function IdeaLabPage() {
  // Renamed function
  const [idea, setIdea] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [landingPageContent, setLandingPageContent] = useState(null);
  const [mvpRoadmap, setMvpRoadmap] = useState(null);
  const [marketChartData, setMarketChartData] = useState(null);
  const [financialData, setFinancialData] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Please wait..."); // Add loading message state
  const [ideaLabId, setIdeaLabId] = useState(null); // Add this state

  // Function to reset the states of different components
  const resetComponentStates = () => {
    setResponse(null);
    setMvpRoadmap(null);
    setLandingPageContent(null);
    setMarketChartData(null);
    setFinancialData(null);
  };

  const handleIdeaSubmit = async (ideaData) => {
    const { title, idea } = ideaData;
    setLoading(true);
    setError(null);
    resetComponentStates();

    // Store in DB first
    let newIdeaLabId = null;
    try {
      const dbRes = await fetch("https://idealab-ax37.vercel.app/idealab/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, idea }),
      });
      const dbData = await dbRes.json();
      if (!dbRes.ok || !dbData.success) {
        throw new Error(dbData.error || "Failed to save idea to database");
      }
      newIdeaLabId = dbData.idealab._id;
      setIdeaLabId(newIdeaLabId);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return;
    }

    // Retrieve financial inputs from local storage
    const storedFinancialInputs = JSON.parse(
      localStorage.getItem("financialInputs")
    );

    try {
      // Step 1: Generate market research and analysis
      setLoadingMessage(
        "Analyzing your idea and conducting market research..."
      ); // Set message
      const researchResponse = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: idea }), // Use extracted idea
      });

      if (!researchResponse.ok) {
        const errorData = await researchResponse.json();
        throw new Error(errorData.detail || "Failed to analyze idea");
      }

      const data = await researchResponse.json();
      console.log("API Response:", data);
      setResponse(data);

      // --- Save the output to the backend ---
      if (newIdeaLabId) {
        const saveRes = await fetch(`https://idealab-ax37.vercel.app/idealab/save-output/${newIdeaLabId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ output: data }),
        });
        const saveData = await saveRes.json();
        console.log("Saved output to DB:", saveData);
      }

      // Step 2: Generate MVP roadmap
      setLoadingMessage("Generating your MVP roadmap..."); // Update message
      const mvpResponse = await fetch("http://localhost:8000/mvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: idea }), // Use extracted idea
      });

      if (!mvpResponse.ok) {
        const errorData = await mvpResponse.json();
        throw new Error(errorData.detail || "Failed to generate MVP roadmap");
      }
      const mvpData = await mvpResponse.json();
      setMvpRoadmap(mvpData);

      // Step 3: Generate landing page content
      setLoadingMessage("Creating your landing page content...");
      const landingPageResponse = await fetch(
        "http://localhost:8000/api/generate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idea: idea }), // Use extracted idea
        }
      );

      if (!landingPageResponse.ok) {
        const errorData = await landingPageResponse.json();
        throw new Error(errorData.detail || "Failed to generate landing page");
      }
      const landingPageText = await landingPageResponse.text();
      // Try to extract the JSON part
      const jsonStart = landingPageText.indexOf('{');
      const jsonString = landingPageText.slice(jsonStart);

      let landingPageData;
      try {
        landingPageData = JSON.parse(jsonString);
      } catch (e) {
        throw new Error("Failed to parse landing page JSON");
      }
      setLandingPageContent(landingPageData);

      // Step 4: Generate market chart data
      setLoadingMessage("Generating market charts and analysis...");
      const chartResponse = await fetch("http://localhost:8000/charts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: idea }), // Use extracted idea
      });

      if (!chartResponse.ok) {
        const errorData = await chartResponse.json();
        throw new Error(
          errorData.detail || "Failed to fetch market charts data"
        );
      }

      const marketAnalysis = await chartResponse.json();

      // Check if marketAnalysis and its required properties exist
      if (marketAnalysis && marketAnalysis.market_analysis) {
        const { market_overview, competitive_landscape, regional_analysis } =
          marketAnalysis.market_analysis;

        const transformedChartData = {
          growthData: [],
          segmentsData: [],
          competitiveData: [],
          regionalData: [],
        };

        if (market_overview) {
          if (market_overview.total_market_size) {
            transformedChartData.growthData.push({
              year: parseFloat(market_overview.total_market_size.year || 0),
              size: parseFloat(market_overview.total_market_size.value || 0),
            });
          }
          if (market_overview.total_market_size_projected) {
            transformedChartData.growthData.push({
              year: parseFloat(
                market_overview.total_market_size_projected.year || 0
              ),
              size: parseFloat(
                market_overview.total_market_size_projected.value || 0
              ),
            });
          }

          if (Array.isArray(market_overview.market_segments)) {
            transformedChartData.segmentsData =
              market_overview.market_segments.map((segment) => ({
                name: segment.segment_name || "",
                value: parseFloat(segment.segment_size || 0),
              }));
          }
        }

        if (
          competitive_landscape &&
          Array.isArray(competitive_landscape.market_share_distribution)
        ) {
          transformedChartData.competitiveData =
            competitive_landscape.market_share_distribution.map(
              (competitor) => ({
                name: competitor.competitor_name || "",
                share: parseFloat(competitor.market_share || 0),
              })
            );
        }

        if (regional_analysis && Array.isArray(regional_analysis.regions)) {
          transformedChartData.regionalData = regional_analysis.regions.map(
            (region) => ({
              region: region.region || "",
              size: parseFloat(region.market_size || 0),
            })
          );
        }
        setMarketChartData(transformedChartData);
      } else {
        // Handle the case where data is missing or in unexpected structure.
        console.error(
          "Invalid or incomplete market chart data from API:",
          marketAnalysis
        );
        setError("Invalid market data received from the server.");
        setMarketChartData(null); // Ensure the component doesn't try to render with missing data.
      }

      // Step 5: Generate financial analysis
      // Only send if storedFinancialInputs exist
      if (storedFinancialInputs) {
        setLoadingMessage("Performing financial analysis...");
        const financialResponse = await fetch(
          "http://localhost:8000/financial_analysis",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              idea: idea,
              ...storedFinancialInputs, // Use stored inputs
            }),
          }
        );
        if (!financialResponse.ok) {
          const errorData = await financialResponse.json();
          throw new Error(
            errorData.detail || "Failed to generate financial analysis"
          );
        }
        const financialAnalysisData = await financialResponse.json();
        setFinancialData(financialAnalysisData);
      }
    } catch (err) {
      console.error("API Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMessage("Please wait..."); // Reset message
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            IdeaLab{" "}
            <span className="text-white italic font-thin font-['Voyage_Bold']">
              Studio
            </span>
          </h1>
          <p className="text-gray-500 text-lg mt-2">
            Transform your ideas into reality with our comprehensive innovation
            tools
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Idea Input Section */}
          <div className="p-8 bg-gray-900/30 border border-white/10 rounded-lg">
            <IdeaInputForm onIdeaSubmit={handleIdeaSubmit} loading={loading} />
          </div>

          {/* Results Grid */}
          {response && (
            <div className="">
              <div className="p-6 bg-gray-900/30 border border-white/10 rounded-lg">
                <StrategicOverview response={response} />
              </div>
              <div className="p-6 bg-gray-900/30 border border-white/10 rounded-lg">
                <ValidationScore response={response} />
              </div>
            </div>
          )}

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
              <h2 className="text-2xl font-semibold mb-6">
                Landing Page Preview
              </h2>
              <LandingPagePreview content={landingPageContent} />
            </div>
          )}

          {/* Financial Analysis */}
          {financialData && (
            <div className="p-6 bg-gray-900/30 border border-white/10 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6">
                Financial Analysis
              </h2>
              <FinancialAnalysisDisplay data={financialData} />
            </div>
          )}
        </div>

        {/* Error Display */}
        <ErrorDisplay error={error} />

        {/* Loading Overlay */}
        <LoadingOverlay loading={loading} loadingMessage={loadingMessage} />
      </div>
    </div>
  );
}

export default IdeaLabPage;
