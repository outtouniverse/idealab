import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AllIdeaLabsPage() {
  const [idealabs, setIdeaLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://idealab-ax37.vercel.app//idealab/all", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIdeaLabs(data.idealabs);
        } else {
          setError(data.error);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            All{" "}
            <span className="text-white italic font-thin font-['Voyage_Bold']">
              IdeaLabs
            </span>
          </h1>
          <p className="text-gray-500 text-lg mt-2">
            View and manage all your innovation projects
          </p>
        </div>

        {/* IdeaLabs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {idealabs.map((idealab) => (
            <div
              key={idealab._id}
              className="p-6 bg-gray-900/30 border border-white/10 rounded-lg shadow-xl hover:bg-gray-900/50 transition-colors"
            >
              <Link
                to={`/idealab/${idealab._id}`}
                className="block"
              >
                <h3 className="text-indigo-100 hover:text-indigo-300 font-semibold text-xl mb-2">
                  {idealab.title}
                </h3>
                <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                  {idealab.idea}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">
                    {new Date(idealab.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-indigo-400 text-sm">
                    View Details →
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 