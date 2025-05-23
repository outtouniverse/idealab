import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentIdeaLabs, setRecentIdeaLabs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://idealab-ax37.vercel.app/auth/user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user) {
          setUser(data.user);
          // Fetch recent IdeaLabs after user is authenticated
          fetch("https://idealab-ax37.vercel.app/idealab/recent", {
            credentials: "include",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                setRecentIdeaLabs(data.idealabs);
              }
            })
            .catch((err) => console.error("Failed to fetch recent IdeaLabs:", err));
        } else {
          navigate("/login");
        }
      })
      .catch(() => navigate("/login"))
      .finally(() => setLoading(false));
  }, [navigate]);

  const createIdealab = () => {
    fetch('https://idealab-ax37.vercel.app/idealab/new', {
      method: 'POST',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => alert('Idealab created!'));
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return null; // Will redirect to login

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Your{" "}
          <span className="text-white italic font-thin font-['Voyage_Bold']">
            Dashboard
          </span>
        </h1>
        <p className="text-gray-500 text-lg mt-2">
          Track and manage your innovation journey
        </p>
      </div>

      {/* Recent IdeaLabs Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold text-gray-300">
              Recent IdeaLabs
            </h2>
            <Link
              to="/idealabs"
              className="text-indigo-400 hover:text-indigo-300 text-sm"
            >
              View All →
            </Link>
          </div>
          <Link
            to="/idealab"
            className="px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Create New IdeaLab
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentIdeaLabs.map((idealab) => (
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

      {/* Quick Actions Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-300 mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-900/30 border border-white/10 rounded-lg shadow-xl hover:bg-gray-900/50 transition-colors">
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-gray-400 mb-4">
              View detailed project metrics and insights
            </p>
            <Link
              to="/analytics"
              className="text-indigo-400 hover:text-indigo-300"
            >
              View Analytics →
            </Link>
          </div>
          <div className="p-6 bg-gray-900/30 border border-white/10 rounded-lg shadow-xl hover:bg-gray-900/50 transition-colors">
            <h3 className="text-xl font-semibold mb-2">Team</h3>
            <p className="text-gray-400 mb-4">
              Manage your team members and permissions
            </p>
            <Link to="/team" className="text-indigo-400 hover:text-indigo-300">
              Manage Team →
            </Link>
          </div>
          <div className="p-6 bg-gray-900/30 border border-white/10 rounded-lg shadow-xl hover:bg-gray-900/50 transition-colors">
            <h3 className="text-xl font-semibold mb-2">Settings</h3>
            <p className="text-gray-400 mb-4">
              Configure your account and preferences
            </p>
            <Link
              to="/settings"
              className="text-indigo-400 hover:text-indigo-300"
            >
              Go to Settings →
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-300 mb-6">
          Welcome, {user.displayName}
        </h2>
        <button
          onClick={createIdealab}
          className="px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Create New IdeaLab
        </button>
      </div>
    </div>
  );
}
