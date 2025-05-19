import {
  Target,
  LayoutDashboard,
  Code,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

function MVPRoadmap({ roadmap }) {
  return (
    <div className="bg-gray-900/30 border border-white/10 p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6">
        MVP{" "}
        <span className="text-white italic font-thin font-['Voyage_Bold']">
          Roadmap
        </span>
      </h2>

      <div className="space-y-8">
        {/* MVP Summary */}
        <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <LayoutDashboard className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-semibold text-gray-300">MVP Summary</h3>
          </div>
          <motion.p
            className="text-gray-400 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {roadmap.mvpSummary}
          </motion.p>
        </div>

        {/* Target Audience */}
        <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-semibold text-gray-300">
              Target Audience
            </h3>
          </div>
          <motion.p
            className="text-gray-400 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {roadmap.targetAudience}
          </motion.p>
        </div>

        {/* Key Features */}
        <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-semibold text-gray-300">
              Key Features
            </h3>
          </div>
          <motion.ul
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {roadmap.keyFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">{feature}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Technical Stack */}
        <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Code className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-semibold text-gray-300">
              Technical Stack
            </h3>
          </div>
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {roadmap.technicalStack.map((tech, index) => (
              <div
                key={index}
                className="px-3 py-1.5 bg-gray-700/50 text-gray-300 rounded-full text-sm"
              >
                {tech}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Development Timeline */}
        <div className="bg-gray-800/50 p-6 rounded-lg border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-semibold text-gray-300">
              Development Timeline
            </h3>
          </div>
          <div className="space-y-6">
            <motion.ul
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {roadmap.timeline.milestones.map((milestone, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-indigo-600/20 text-indigo-400 rounded-full flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium">{milestone}</p>
                  </div>
                </li>
              ))}
            </motion.ul>
            <motion.p
              className="text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <span className="font-medium text-gray-300">
                Estimated Completion:
              </span>{" "}
              {roadmap.timeline.estimatedCompletion}
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MVPRoadmap;
