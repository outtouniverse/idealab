import { Card, CardContent } from "./ui/Card";
import { Loader2 } from "lucide-react";

function LoadingOverlay({ loading, loadingMessage }) {
  // Add loadingMessage prop
  return (
    loading && (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
        <Card className="w-[300px] bg-white/90 dark:bg-gray-900/90 rounded-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              <p className="text-gray-600 dark:text-gray-400 text-center">
                {loadingMessage || "Please wait..."} {/* Display message */}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  );
}

export default LoadingOverlay;
