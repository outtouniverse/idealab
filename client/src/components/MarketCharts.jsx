import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const MarketCharts = ({ data }) => {
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  const regionalChartRef = useRef(null);

  const lineChartInstance = useRef(null);
  const pieChartInstance = useRef(null);
  const barChartInstance = useRef(null);
  const regionalChartInstance = useRef(null);

  useEffect(() => {
    if (!data) return;

    const destroyChart = (instanceRef) => {
      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null; //  Important: Set to null after destroying
      }
    };

    // --- Line Chart (Market Growth) ---
    if (data.growthData && lineChartRef.current) {
      const ctx = lineChartRef.current.getContext("2d");
      if (ctx) {
        destroyChart(lineChartInstance); // Destroy existing instance

        lineChartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: data.growthData.map((item) => item.year),
            datasets: [
              {
                label: "Market Size (USD Billion)",
                data: data.growthData.map((item) => item.size),
                borderColor: "#6366f1", //  Indigo color
                backgroundColor: "rgba(99, 102, 241, 0.1)", // Light indigo
                borderWidth: 2,
                fill: true, // Fill the area under the line
                tension: 0.4,
                pointRadius: 3,
                pointBackgroundColor: "#6366f1",
                pointBorderColor: "#fff",
                pointHoverRadius: 5,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: { display: false }, // Remove x-axis grid lines
                ticks: {
                  color: "#6b7280", // Darker tick color
                },
              },
              y: {
                grid: { color: "rgba(0, 0, 0, 0.05)" }, // Very subtle grid
                ticks: {
                  color: "#6b7280",
                  callback: function (value) {
                    return "$" + value + "B"; // Format y-axis labels
                  },
                },
              },
            },
            plugins: {
              legend: { display: false }, // Hide legend
              tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)", // Dark tooltip
                titleColor: "#fff",
                bodyColor: "#fff",
                borderColor: "#6366f1",
                borderWidth: 1,
              },
            },
          },
        });
      }
    }

    // --- Pie Chart (Market Segments) ---
    if (data.segmentsData && pieChartRef.current) {
      const ctx = pieChartRef.current.getContext("2d");
      if (ctx) {
        destroyChart(pieChartInstance);

        const backgroundColors = [
          "#6366f1", // Indigo
          "#f59e0b", // Amber
          "#10b981", // Emerald
          "#3b82f6", // Blue
          "#8b5cf6", // Violet
          "#f43f5e", // Rose
        ];

        pieChartInstance.current = new Chart(ctx, {
          type: "pie", // Or 'doughnut'
          data: {
            labels: data.segmentsData.map((item) => item.name),
            datasets: [
              {
                data: data.segmentsData.map((item) => item.value),
                backgroundColor: backgroundColors,
                borderColor: "rgba(255, 255, 255, 0.5)", // Light border for segments
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  color: "#6b7280", //  Darker text for labels
                  usePointStyle: true, // Use point style (circle) in legend
                },
              },
              tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleColor: "#fff",
                bodyColor: "#fff",
              },
            },
          },
        });
      }
    }

    // --- Bar Chart (Competitive Landscape) ---
    if (data.competitiveData && barChartRef.current) {
      const ctx = barChartRef.current.getContext("2d");
      if (ctx) {
        destroyChart(barChartInstance);

        barChartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: data.competitiveData.map((item) => item.name),
            datasets: [
              {
                label: "Market Share (%)",
                data: data.competitiveData.map((item) => item.share),
                backgroundColor: "#10b981", //  Emerald color
                borderColor: "rgba(16, 185, 129, 0.2)", // Lighter border
                borderWidth: 1,
                borderRadius: 4, // Rounded corners for bars
              },
            ],
          },
          options: {
            indexAxis: "y", // Horizontal bar chart
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: { display: false },
                ticks: { color: "#6b7280" },
                beginAtZero: true, // Ensure x-axis starts at 0
              },
              y: {
                grid: { display: false }, // Remove y-axis grid lines
                ticks: { color: "#6b7280" },
              },
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleColor: "#fff",
                bodyColor: "#fff",
                callbacks: {
                  label: function (context) {
                    // Custom tooltip label
                    return (
                      context.dataset.label + ": " + context.parsed.x + "%"
                    );
                  },
                },
              },
            },
          },
        });
      }
    }

    // --- Bar Chart (Regional Analysis) ---
    if (data.regionalData && regionalChartRef.current) {
      const ctx = regionalChartRef.current.getContext("2d");
      if (ctx) {
        destroyChart(regionalChartInstance);

        regionalChartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: data.regionalData.map((item) => item.region),
            datasets: [
              {
                label: "Market Size (USD Billion)",
                data: data.regionalData.map((item) => item.size),
                backgroundColor: "#f59e0b", // Amber color
                borderColor: "rgba(245, 158, 11, 0.2)", // Lighter border
                borderWidth: 1,
                borderRadius: 4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: { display: false },
                ticks: { color: "#6b7280" },
              },
              y: {
                grid: { color: "rgba(0, 0, 0, 0.05)" },
                ticks: {
                  color: "#6b7280",
                  callback: function (value) {
                    return "$" + value + "B";
                  },
                },
                beginAtZero: true,
              },
            },
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleColor: "#fff",
                bodyColor: "#fff",
              },
            },
          },
        });
      }
    }
    // Cleanup function to destroy charts when component unmounts or data changes.
    return () => {
      destroyChart(lineChartInstance);
      destroyChart(pieChartInstance);
      destroyChart(barChartInstance);
      destroyChart(regionalChartInstance);
    };
  }, [data]);

  if (!data) return null;

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8" // Added padding here
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Market Growth Chart */}
      <div className="col-span-2 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Market Growth Projection
        </h3>
        <div className="h-[300px] relative">
          {" "}
          {/* Use relative positioning */}
          <canvas ref={lineChartRef} />
        </div>
      </div>

      {/* Market Segments Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Market Segments
        </h3>
        <div className="h-[300px] relative">
          <canvas ref={pieChartRef} />
        </div>
      </div>

      {/* Competitive Landscape Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Competitive Landscape
        </h3>
        <div className="h-[300px] relative">
          <canvas ref={barChartRef} />
        </div>
      </div>

      {/* Regional Analysis Chart */}
      <div className="col-span-2 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Regional Analysis
        </h3>
        <div className="h-[300px] relative">
          <canvas ref={regionalChartRef} />
        </div>
      </div>
    </motion.div>
  );
};

export default MarketCharts;
