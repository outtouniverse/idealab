// pages/ProfilePage.jsx
import React from "react";

function ProfilePage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">
          Your{" "}
          <span className="text-white italic font-thin font-['Voyage_Bold']">
            Profile
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Information */}
          <div className="p-6 bg-gray-900/30 border border-white/10 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">
              Personal Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="text-gray-400">Full Name</label>
                <p className="text-white text-lg">Margot Foster</p>
              </div>
              <div>
                <label className="text-gray-400">Email</label>
                <p className="text-white text-lg">margotfoster@example.com</p>
              </div>
              <div>
                <label className="text-gray-400">Member Since</label>
                <p className="text-white text-lg">January 2023</p>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="p-6 bg-gray-900/30 border border-white/10 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="text-gray-300">
                <p>Created new IdeaLab: "EcoTrack Platform"</p>
                <p className="text-sm text-gray-400">2 days ago</p>
              </div>
              <div className="text-gray-300">
                <p>Updated profile information</p>
                <p className="text-sm text-gray-400">1 week ago</p>
              </div>
              <div className="text-gray-300">
                <p>Completed onboarding</p>
                <p className="text-sm text-gray-400">1 month ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-900/30 border border-white/10 rounded-lg">
            <h3 className="text-gray-400 mb-2">IdeaLabs Created</h3>
            <p className="text-3xl font-bold">12</p>
          </div>
          <div className="p-6 bg-gray-900/30 border border-white/10 rounded-lg">
            <h3 className="text-gray-400 mb-2">Team Members</h3>
            <p className="text-3xl font-bold">8</p>
          </div>
          <div className="p-6 bg-gray-900/30 border border-white/10 rounded-lg">
            <h3 className="text-gray-400 mb-2">Active Projects</h3>
            <p className="text-3xl font-bold">3</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
