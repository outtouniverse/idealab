import React from "react";
import FAQ from "../components/FAQs";

// Enhanced SVG Patterns with more complex animations
const Confetti = () => (
  <svg
    className="absolute right-0 top-0 w-full h-full text-yellow-200/20"
    viewBox="0 0 100 100"
    style={{ filter: "blur(0.5px)" }}
  >
    <defs>
      <pattern
        id="confettiPattern"
        width="10"
        height="10"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M1,1 L4,1 L2.5,4 Z"
          fill="currentColor"
          className="group-hover:animate-bounce"
          style={{ transformOrigin: "center" }}
        />
      </pattern>
    </defs>
    <rect
      width="100%"
      height="100%"
      fill="url(#confettiPattern)"
      className="group-hover:animate-pulse"
    />
    {[...Array(12)].map((_, i) => (
      <circle
        key={i}
        cx={Math.random() * 100}
        cy={Math.random() * 100}
        r="1.5"
        fill="currentColor"
        className="group-hover:animate-ping"
        style={{ animationDelay: `${i * 0.2}s`, animationDuration: "3s" }}
      />
    ))}
  </svg>
);

const Arrows = () => (
  <svg
    className="absolute right-0 top-0 w-full h-full text-teal-200/20"
    viewBox="0 0 100 100"
    style={{ filter: "blur(0.5px)" }}
  >
    <defs>
      <pattern
        id="arrowsPattern"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M2,5 L18,5 L10,15 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="group-hover:animate-pulse"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#arrowsPattern)" />
    {[...Array(8)].map((_, i) => (
      <g
        key={i}
        className="group-hover:animate-bounce"
        style={{ animationDelay: `${i * 0.1}s` }}
      >
        <line
          x1={10 + i * 10}
          y1={20 + i * 5}
          x2={20 + i * 10}
          y2={20 + i * 5}
          stroke="currentColor"
          strokeWidth="0.5"
          className="group-hover:animate-pulse"
        />
        <circle
          cx={15 + i * 10}
          cy={20 + i * 5}
          r="0.5"
          fill="currentColor"
          className="group-hover:animate-ping"
        />
      </g>
    ))}
  </svg>
);

const Pixels = () => (
  <svg
    className="absolute right-0 top-0 w-full h-full text-blue-200/20"
    viewBox="0 0 100 100"
    style={{ filter: "blur(0.5px)" }}
  >
    <defs>
      <pattern
        id="pixelGrid"
        width="10"
        height="10"
        patternUnits="userSpaceOnUse"
      >
        <rect
          width="8"
          height="8"
          fill="currentColor"
          className="group-hover:animate-pulse"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#pixelGrid)" opacity="0.1" />
    {[...Array(20)].map((_, i) => (
      <g key={i}>
        <rect
          x={70 + (i % 5) * 6}
          y={10 + Math.floor(i / 5) * 6}
          width="4"
          height="4"
          fill="currentColor"
          className="group-hover:animate-ping"
          style={{ animationDelay: `${i * 0.1}s`, animationDuration: "2s" }}
        />
        <circle
          cx={72 + (i % 5) * 6}
          cy={12 + Math.floor(i / 5) * 6}
          r="0.5"
          fill="currentColor"
          className="group-hover:animate-pulse"
        />
      </g>
    ))}
  </svg>
);

const Equalizer = () => (
  <svg
    className="absolute right-0 top-0 w-full h-full text-purple-200/20"
    viewBox="0 0 100 100"
    style={{ filter: "blur(0.5px)" }}
  >
    <defs>
      <pattern
        id="equalizerBg"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <circle
          cx="10"
          cy="10"
          r="1"
          fill="currentColor"
          className="group-hover:animate-pulse"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#equalizerBg)" opacity="0.1" />
    {[...Array(10)].map((_, i) => (
      <g
        key={i}
        className="group-hover:animate-bounce"
        style={{ animationDelay: `${i * 0.15}s` }}
      >
        <rect
          x={60 + i * 4}
          y={20 + Math.sin(i * 0.8) * 20}
          width="2"
          height={30 - Math.cos(i * 0.8) * 15}
          fill="currentColor"
        />
        <circle
          cx={61 + i * 4}
          cy={35 + Math.sin(i * 0.8) * 10}
          r="0.5"
          fill="currentColor"
          className="group-hover:animate-ping"
        />
      </g>
    ))}
  </svg>
);

const LandingPage = () => {
  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="text-center py-20">
          <p className="text-gray-600 text-xl font-semibold">
            Don't settle for ordinary.
          </p>
          <h1 className="text-4xl mb-4 font-bold tracking-tight">
            Create{" "}
            <span className="text-6xl text-white italic font-thin font-['Voyage_Bold']">
              innovation.
            </span>
          </h1>
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-6">
          {/* Ideation Card */}
          <div className="group relative h-[65vh] bg-yellow-500 text-black p-8 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-yellow-300/30 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
            <Confetti />
            <div className="relative z-10">
              <h2 className="text-5xl font-black mb-4 tracking-tight">
                Ideate
              </h2>
              <p className="text-black/70 mb-8 font-light">
                Transform concepts into validated business ideas
              </p>
              <button className="bg-black text-yellow-400 px-4 py-2 rounded font-mono text-sm group-hover:bg-black/80 transition-colors">
                LAUNCH IDEATION →
              </button>
            </div>
          </div>

          {/* Validation Card */}
          <div className="group relative h-[65vh] bg-teal-900 p-8 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-800/30 to-teal-700/30 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
            <Arrows />
            <div className="relative z-10">
              <h2 className="text-5xl font-black mb-4 tracking-tight">
                Validate
              </h2>
              <p className="text-white/70 mb-8 font-light">
                Test assumptions with real market data
              </p>
              <button className="border border-white/80 px-4 py-2 rounded font-mono text-sm group-hover:bg-white/10 transition-colors">
                JOIN WAITLIST →
              </button>
              <div className="mt-4">
                <button className="text-sm text-white/60 font-mono hover:text-white/80 transition-colors">
                  WATCH SAMPLES ▶
                </button>
              </div>
            </div>
          </div>

          {/* Build Card */}
          <div className="group relative h-[65vh] bg-blue-900 p-8 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-800/30 to-blue-700/30 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
            <Pixels />
            <div className="relative z-10">
              <h2 className="text-5xl font-black mb-4 tracking-tight">Build</h2>
              <p className="text-white/70 mb-8 font-light">
                Create MVPs faster than ever before
              </p>
              <button className="border border-white/80 px-4 py-2 rounded font-mono text-sm group-hover:bg-white/10 transition-colors">
                LAUNCH BUILDER →
              </button>
            </div>
          </div>

          {/* Scale Card */}
          <div className="group relative h-[65vh] bg-purple-900 p-8 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-800/30 to-purple-700/30 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out" />
            <Equalizer />
            <div className="relative z-10">
              <h2 className="text-5xl font-black mb-4 tracking-tight">Scale</h2>
              <p className="text-white/70 mb-8 font-light">
                Grow your startup systematically
              </p>
              <button className="border border-white/80 px-4 py-2 rounded font-mono text-sm group-hover:bg-white/10 transition-colors">
                START SCALING →
              </button>
            </div>
          </div>
        </div>
        <FAQ />
        {/* Footer */}
        <footer className="flex justify-between items-center p-6 mt-20">
          <div>
            <img
              src="/api/placeholder/120/40"
              alt="Startup Labs"
              className="h-8"
            />
          </div>
          <div className="flex space-x-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
