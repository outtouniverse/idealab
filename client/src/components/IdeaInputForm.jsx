import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  PlusCircle,
  XCircle,
  CheckCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Button } from "./ui/button"; // Import Button

// --- Suggestion Data (Ideally, move this to a separate file) ---
const revenueModelOptions = [
  { value: "subscription", label: "Subscription" },
  { value: "freemium", label: "Freemium" },
  { value: "advertising", label: "Advertising" },
  { value: "transactional", label: "Transactional" },
  { value: "affiliate", label: "Affiliate Marketing" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "licensing", label: "Licensing" },
  { value: "usage-based", label: "Usage-based" },
  { value: "not-sure", label: "Not Sure? " },
];

const regionOptions = [
  { value: "north_america", label: "North America" },
  { value: "europe", label: "Europe" },
  { value: "asia", label: "Asia" },
  { value: "south_america", label: "South America" },
  { value: "africa", label: "Africa" },
  { value: "oceania", label: "Oceania" },
  { value: "global", label: "Global" },
  { value: "not-sure", label: "Not Sure? " },
];

const ageGroupOptions = [
  { value: "18-24", label: "18-24" },
  { value: "25-34", label: "25-34" },
  { value: "35-44", label: "35-44" },
  { value: "45-54", label: "45-54" },
  { value: "55+", label: "55+" },
  { value: "not-sure", label: "Not Sure? " },
];

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "not-sure", label: "Not Sure? " },
];

// --- Helper function for auto-suggestions ---
const getFilteredSuggestions = (suggestions, value) => {
  const inputValue = value.trim().toLowerCase();
  if (inputValue === "") {
    return []; // Return empty array for empty input
  }
  return suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(inputValue)
  );
};

const competitorInspirationSuggestions = [
  "Similar business models",
  "Addressing the same customer need",
  "Utilizing a comparable technology",
  "Operating in a related industry",
];
const additionalContextSuggestions = [
  "Unique selling propositions",
  "Key partnerships",
  "Funding status",
  "Team expertise",
  "Intellectual property",
];

function IdeaInputForm({ onIdeaSubmit, loading }) {
  const [title, setTitle] = useState("");
  const [idea, setIdea] = useState("");
  const [revenueModel, setRevenueModel] = useState(""); // Single string
  const [selectedRegions, setSelectedRegions] = useState([]); // Array
  const [selectedAgeGroups, setSelectedAgeGroups] = useState([]); // Array
  const [selectedGenders, setSelectedGenders] = useState([]); // Array
  const [competitorInspiration, setCompetitorInspiration] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");
  const [errors, setErrors] = useState({});
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [suggestedCompetitors, setSuggestedCompetitors] = useState([]);
  const [suggestedContexts, setSuggestedContexts] = useState([]);

  useEffect(() => {
    setSuggestedCompetitors(
      getFilteredSuggestions(
        competitorInspirationSuggestions,
        competitorInspiration
      )
    );
    setSuggestedContexts(
      getFilteredSuggestions(additionalContextSuggestions, additionalContext)
    );
  }, [competitorInspiration, additionalContext]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !idea.trim()) return;
    const newErrors = {};
    if (!idea.trim()) {
      newErrors.idea = "Please describe your startup idea.";
    }
    // Add other validation as needed

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const ideaData = {
      title,
      idea,
      revenueModel,
      competitorInspiration,
      newRegion: selectedRegions,
      targetAudience: {
        ageGroups: selectedAgeGroups,
        genders: selectedGenders,
      },
      additionalContext,
    };
    onIdeaSubmit(ideaData);
  };

  const handleSuggestionClick = (field, suggestion) => {
    switch (field) {
      case "competitorInspiration":
        setCompetitorInspiration(suggestion);
        break;
      case "additionalContext":
        setAdditionalContext(suggestion);
        break;
      default:
        break;
    }
  };

  // --- Handlers for "Select All" and "Clear All" ---

  const handleSelectAll = (field) => {
    switch (field) {
      case "regions":
        setSelectedRegions(regionOptions.map((option) => option.value));
        break;
      case "ageGroups":
        setSelectedAgeGroups(ageGroupOptions.map((option) => option.value));
        break;
      case "genders":
        setSelectedGenders(genderOptions.map((option) => option.value));
        break;
      default:
        break;
    }
  };

  const handleClearAll = (field) => {
    switch (field) {
      case "regions":
        setSelectedRegions([]);
        break;
      case "ageGroups":
        setSelectedAgeGroups([]);
        break;
      case "genders":
        setSelectedGenders([]);
        break;
      default:
        break;
    }
  };

  // --- Toggle Group/Segmented Control Handlers ---
  const handleRevenueModelChange = (value) => {
    setRevenueModel(value);
  };

  const handleRegionSelect = (value) => {
    if (selectedRegions.includes(value)) {
      setSelectedRegions(selectedRegions.filter((region) => region !== value));
    } else {
      setSelectedRegions([...selectedRegions, value]);
    }
  };

  const handleAgeGroupSelect = (value) => {
    if (selectedAgeGroups.includes(value)) {
      setSelectedAgeGroups(
        selectedAgeGroups.filter((ageGroup) => ageGroup !== value)
      );
    } else {
      setSelectedAgeGroups([...selectedAgeGroups, value]);
    }
  };

  const handleGenderSelect = (value) => {
    if (selectedGenders.includes(value)) {
      setSelectedGenders(selectedGenders.filter((gender) => gender !== value));
    } else {
      setSelectedGenders([...selectedGenders, value]);
    }
  };

  return (
    <div className="bg-transparent p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-4">
        Describe Your{" "}
        <span className="text-white italic font-thin font-['Voyage_Bold']">
          Idea
        </span>
      </h2>
      <p className="text-gray-400 mb-8">
        Let's bring your vision to life. Share your innovative concept with us.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-lg font-semibold mb-1">Title of Idea</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-gray-800 border border-white/10 text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for your idea"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-semibold mb-1">Describe your Idea</label>
          <textarea
            className="w-full p-2 rounded bg-gray-800 border border-white/10 text-white"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your idea in detail"
            rows={4}
            required
          />
        </div>
        <div className="space-y-6">
          <button
            type="button"
            className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-2"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? (
              <>
                <ChevronUp className="w-5 h-5" />
                Hide Advanced Options
              </>
            ) : (
              <>
                <ChevronDown className="w-5 h-5" />
                Show Advanced Options
              </>
            )}
          </button>

          {showAdvanced && (
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Target Regions */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Target Region(s):
                </label>
                <div className="flex flex-wrap gap-2">
                  {regionOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedRegions.includes(option.value)
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                      onClick={() => handleRegionSelect(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    className="text-xs text-gray-400 hover:text-gray-300 flex items-center gap-1"
                    onClick={() => handleSelectAll("regions")}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Select All
                  </button>
                  <button
                    type="button"
                    className="text-xs text-gray-400 hover:text-gray-300 flex items-center gap-1"
                    onClick={() => handleClearAll("regions")}
                  >
                    <XCircle className="w-4 h-4" />
                    Clear All
                  </button>
                </div>
              </div>

              {/* Revenue Model (Segmented Control) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  How will you make money?
                </label>
                <div className="mt-1 flex space-x-2">
                  {revenueModelOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`px-4 py-2 rounded-md text-sm font-medium ${
                        revenueModel === option.value
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                      onClick={() => handleRevenueModelChange(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Audience (Demographics) */}
              <div>
                <h3 className="text-lg font-medium text-gray-300 mb-2">
                  Target Audience
                </h3>
                <div className="mb-4">
                  <label className="block text-sm mb-2 font-medium text-gray-300">
                    Age Groups:
                  </label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {ageGroupOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          selectedAgeGroups.includes(option.value)
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}
                        onClick={() => handleAgeGroupSelect(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      className="text-xs text-gray-400 hover:text-gray-300 flex items-center gap-1"
                      onClick={() => handleSelectAll("ageGroups")}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Select All
                    </button>
                    <button
                      type="button"
                      className="text-xs text-gray-400 hover:text-gray-300 flex items-center gap-1"
                      onClick={() => handleClearAll("ageGroups")}
                    >
                      <XCircle className="w-4 h-4" />
                      Clear All
                    </button>
                  </div>
                </div>

                <div className="">
                  <label className="block text-sm font-medium text-gray-300">
                    Genders:
                  </label>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {genderOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          selectedGenders.includes(option.value)
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                        }`}
                        onClick={() => handleGenderSelect(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      className="text-xs text-gray-400 hover:text-gray-300 flex items-center gap-1"
                      onClick={() => handleSelectAll("genders")}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Select All
                    </button>
                    <button
                      type="button"
                      className="text-xs text-gray-400 hover:text-gray-300 flex items-center gap-1"
                      onClick={() => handleClearAll("genders")}
                    >
                      <XCircle className="w-4 h-4" />
                      Clear All
                    </button>
                  </div>
                </div>
              </div>

              {/* Competitor Inspiration (with suggestions) */}
              <div>
                <label
                  htmlFor="competitorInspiration"
                  className="block text-sm font-medium text-gray-300"
                >
                  Are there any companies with similar models?
                </label>
                <input
                  type="text"
                  id="competitorInspiration"
                  value={competitorInspiration}
                  onChange={(e) => setCompetitorInspiration(e.target.value)}
                  placeholder="e.g., Companies in the same space"
                  className="mt-1 block w-full px-4 py-3 bg-gray-800/50 border border-white/10 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-100 placeholder-gray-400"
                />
                {suggestedCompetitors.length > 0 && (
                  <div className="mt-1 border border-gray-700 rounded-md bg-gray-800 shadow-md">
                    {suggestedCompetitors.map((suggestion) => (
                      <div
                        key={suggestion}
                        className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
                        onClick={() =>
                          handleSuggestionClick(
                            "competitorInspiration",
                            suggestion
                          )
                        }
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Additional Context (with suggestions) */}
              <div>
                <label
                  htmlFor="additionalContext"
                  className="block text-sm font-medium text-gray-300"
                >
                  Additional Context (Optional)
                </label>
                <textarea
                  id="additionalContext"
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  placeholder="Any other relevant information (unique selling points, partnerships, etc.)"
                  className="mt-1 block w-full px-4 py-3 bg-gray-800/50 border border-white/10 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-100 placeholder-gray-400"
                  rows="3"
                />
                {suggestedContexts.length > 0 && (
                  <div className="mt-1 border border-gray-700 rounded-md bg-gray-800 shadow-md">
                    {suggestedContexts.map((suggestion) => (
                      <div
                        key={suggestion}
                        className="px-3 py-2 hover:bg-gray-700 cursor-pointer"
                        onClick={() =>
                          handleSuggestionClick("additionalContext", suggestion)
                        }
                      >
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Submit Idea"}
        </button>
      </form>
    </div>
  );
}

export default IdeaInputForm;
