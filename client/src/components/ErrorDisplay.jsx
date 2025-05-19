import { Card, CardContent } from "./ui/Card";
import { AlertCircle } from "lucide-react";

function ErrorDisplay({ error }) {
  return (
    error && (
      <Card className="mt-8 border-red-200 bg-red-50 dark:bg-red-900/20 backdrop-blur-lg">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <div>
              <h3 className="text-lg font-medium text-red-800 dark:text-red-200">
                Analysis Error
              </h3>
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  );
}

export default ErrorDisplay;
