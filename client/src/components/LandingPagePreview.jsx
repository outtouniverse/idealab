import { useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Lightbulb } from "lucide-react";
import Editor from "../components/Editor";
import DownloadButton from "../components/DownloadButton";

function LandingPagePreview({ content }) {
  const iframeRef = useRef(null);

  return (
    <section id="landing" className="mt-8">
      <Card className="bg-white/80 dark:bg-gray-900/80 border-0 backdrop-blur-lg">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold">
            <Lightbulb className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            Landing Page Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Editor ref={iframeRef} content={content} />
          <div className="p-4">
            <DownloadButton iframeRef={iframeRef} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default LandingPagePreview;
