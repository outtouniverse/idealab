// components/TopBar.jsx
import React from "react";
import { User as UserIcon } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

function TopBar({ onLogout }) {
  return (
    <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 flex justify-between items-center">
      {/* Logo or other elements can be added here */}
      <div className="flex items-center">
        {/* Placeholder for user info/avatar */}
        <UserIcon className="w-8 h-8 text-gray-600 dark:text-gray-400" />
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Placeholder for user info/avatar */}
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
        >
          Logout
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default TopBar;
