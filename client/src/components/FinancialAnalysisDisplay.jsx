import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { DollarSign } from "lucide-react";

function FinancialAnalysisDisplay({ data }) {
  // Assuming 'data' is your financial analysis object from the API
  return (
    <section id="financial" className="mt-8">
      <Card className="bg-white/80 dark:bg-gray-900/80 border-0 shadow-xl backdrop-blur-lg">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <DollarSign className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            Financial Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 bg-white dark:bg-gray-900  p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Estimated Initial Investment
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              {/* Raw Materials */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Raw Materials
                </h4>
                <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: data.unit || "USD",
                  }).format(data.raw_materials)}
                </p>
              </div>

              {/* Manufacturing Costs */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Manufacturing Costs
                </h4>
                <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: data.unit || "USD",
                  }).format(data.manufacturing_costs)}
                </p>
              </div>

              {/* Equipment Costs */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Equipment
                </h4>
                <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: data.unit || "USD",
                  }).format(data.equipment)}
                </p>
              </div>

              {/* Total Investment */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Investment
                </h4>
                <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: data.unit || "USD",
                  }).format(data.total)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default FinancialAnalysisDisplay;
