// pages/SettingsPage.jsx
import React from "react";

function SettingsPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">
          Account{" "}
          <span className="text-white italic font-thin font-['Voyage_Bold']">
            Settings
          </span>
        </h1>

        <div className="space-y-8">
          {/* Profile Section */}
          <div className="p-6 bg-gray-900/30 border border-white/10 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
            <div className="space-y-6">
              <div className="flex flex-col">
                <label className="text-gray-400 mb-2">Username</label>
                <input
                  type="text"
                  className="bg-gray-800/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter your username"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  className="bg-gray-800/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="p-6 bg-gray-900/30 border border-white/10 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Security</h2>
            <div className="space-y-6">
              <div className="flex flex-col">
                <label className="text-gray-400 mb-2">Current Password</label>
                <input
                  type="password"
                  className="bg-gray-800/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter current password"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-400 mb-2">New Password</label>
                <input
                  type="password"
                  className="bg-gray-800/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter new password"
                />
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors">
                Update Password
              </button>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="p-6 bg-gray-900/30 border border-white/10 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-indigo-600 bg-gray-800/50 border border-white/10 rounded focus:ring-indigo-500"
                />
                <label className="ml-3 text-gray-300">
                  Email Notifications
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-indigo-600 bg-gray-800/50 border border-white/10 rounded focus:ring-indigo-500"
                />
                <label className="ml-3 text-gray-300">Dark Mode</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
