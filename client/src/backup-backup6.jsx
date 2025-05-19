import { useState, useRef, useEffect } from "react";
import { ThemeProvider } from "./components/ui/theme-provider";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import IdeaInputForm from "./components/IdeaInputForm";
import StrategicOverview from "./components/StrategicOverview";
import ValidationScore from "./components/ValidationScore";
import MarketAnalysisCharts from "./components/MarketAnalysisCharts";
import MVPRoadmap from "./components/MVPRoadmap";
import LandingPagePreview from "./components/LandingPagePreview";
import FinancialAnalysisDisplay from "./components/FinancialAnalysisDisplay";
import ErrorDisplay from "./components/ErrorDisplay";
import LoadingOverlay from "./components/LoadingOverlay";

function App() {
  const [idea, setIdea] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [landingPageContent, setLandingPageContent] = useState(null);
  const [mvpRoadmap, setMvpRoadmap] = useState(null);
  const [marketChartData, setMarketChartData] = useState(null);
  const [financialData, setFinancialData] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Please wait..."); // Add loading message state

  // Function to reset the states of different components
  const resetComponentStates = () => {
    setResponse(null);
    setMvpRoadmap(null);
    setLandingPageContent(null);
    setMarketChartData(null);
    setFinancialData(null);
  };

  const handleIdeaSubmit = async (ideaData) => {
    const submittedIdea = ideaData.idea; // Extract the idea string
    setLoading(true);
    setError(null);
    resetComponentStates();

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
        body: JSON.stringify({ idea: submittedIdea }), // Use extracted idea
      });

      if (!researchResponse.ok) {
        const errorData = await researchResponse.json();
        throw new Error(errorData.detail || "Failed to analyze idea");
      }

      const data = await researchResponse.json();
      console.log("API Response:", data);
      setResponse(data);

      // Step 2: Generate MVP roadmap
      setLoadingMessage("Generating your MVP roadmap..."); // Update message
      const mvpResponse = await fetch("http://localhost:8000/mvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: submittedIdea }), // Use extracted idea
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
          body: JSON.stringify({ idea: submittedIdea }), // Use extracted idea
        }
      );

      if (!landingPageResponse.ok) {
        const errorData = await landingPageResponse.json();
        throw new Error(errorData.detail || "Failed to generate landing page");
      }
      const landingPageData = await landingPageResponse.json();
      setLandingPageContent(landingPageData);

      // Step 4: Generate market chart data
      setLoadingMessage("Generating market charts and analysis...");
      const chartResponse = await fetch("http://localhost:8000/charts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: submittedIdea }), // Use extracted idea
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
              idea: submittedIdea,
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
    <ThemeProvider>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <Sidebar />
        <div className="flex-1 ml-64">
          {" "}
          {/* Ensure ml-64 for sidebar */}
          <TopBar />
          <div className="p-8">
            <IdeaInputForm onIdeaSubmit={handleIdeaSubmit} loading={loading} />
            <div className="grid grid-cols-1 gap-6">
              {" "}
              {/* Use grid layout */}
              {response && <StrategicOverview response={response} />}
              {response && <ValidationScore response={response} />}
              {marketChartData && (
                <MarketAnalysisCharts data={marketChartData} />
              )}
              {mvpRoadmap && <MVPRoadmap roadmap={mvpRoadmap} />}
              {landingPageContent && (
                <LandingPagePreview content={landingPageContent} />
              )}
              {financialData && (
                <FinancialAnalysisDisplay data={financialData} />
              )}
            </div>
            <ErrorDisplay error={error} />
          </div>
        </div>
        {/* Pass loadingMessage to LoadingOverlay */}
        <LoadingOverlay loading={loading} loadingMessage={loadingMessage} />
      </div>
    </ThemeProvider>
  );
}

export default App;
