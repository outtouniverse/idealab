import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { TrendingUp } from "lucide-react";
import MarketCharts from "./MarketCharts"; // The inner component with the actual charts

function MarketAnalysisCharts({ data }) {
  if (!data) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        No market data available.
      </div>
    );
  }

  return (
    <section id="market" className="mt-8">
      <Card className="bg-white dark:bg-gray-900 border-0 shadow-xl">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Market Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Remove padding if MarketCharts handles it */}
          <MarketCharts data={data} />
        </CardContent>
      </Card>
    </section>
  );
}

export default MarketAnalysisCharts;
