import React from "react";
import { Link } from "react-router-dom";

function Navbar({ isAuthenticated, onLogout }) {
  return (
    <nav className="bg-black/80 backdrop-blur-sm p-4 text-white sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-black hover:text-gray-300 transition-colors"
        >
          IdeaLab
        </Link>
        <div className="space-x-6">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="hover:text-gray-300 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/idealab"
                className="hover:text-gray-300 transition-colors"
              >
                New IdeaLab
              </Link>
              <Link
                to="/settings"
                className="hover:text-gray-300 transition-colors"
              >
                Settings
              </Link>
              <Link
                to="/profile"
                className="hover:text-gray-300 transition-colors"
              >
                Profile
              </Link>
              <button
                onClick={onLogout}
                className="hover:text-gray-300 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-gray-300 border border-white/10 hover:bg-gray-900/50 uppercase text-sm px-4 py-2 rounded transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hover:text-gray-300 border border-white/10 hover:bg-gray-900/50 uppercase text-sm px-4 py-2 rounded transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
