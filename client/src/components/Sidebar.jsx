// components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home, // Lucide icons
  ClipboardList,
  User,
  Settings,
  Lightbulb,
  LayoutDashboard,
} from "lucide-react";

function Sidebar() {
  const commonClasses =
    "flex items-center p-3 rounded-md transition-colors duration-200";
  const activeClasses = "bg-indigo-600 text-white"; // Active link styles
  const inactiveClasses = "text-gray-300 hover:bg-gray-700";

  return (
    <aside className="w-64 bg-gray-900/30 border-r border-white/10 h-screen flex-shrink-0 sticky top-0">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-white">IdeaLab</h1>
      </div>
      <nav className="p-2 space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? `${commonClasses} ${activeClasses}`
              : `${commonClasses} ${inactiveClasses}`
          }
        >
          <Home className="w-5 h-5 mr-2" />
          Dashboard
        </NavLink>
        <NavLink
          to="/idealab"
          className={({ isActive }) =>
            isActive
              ? `${commonClasses} ${activeClasses}`
              : `${commonClasses} ${inactiveClasses}`
          }
        >
          <LayoutDashboard className="w-5 h-5 mr-2" />
          IdeaLab
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? `${commonClasses} ${activeClasses}`
              : `${commonClasses} ${inactiveClasses}`
          }
        >
          <User className="w-5 h-5 mr-2" />
          Profile
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? `${commonClasses} ${activeClasses}`
              : `${commonClasses} ${inactiveClasses}`
          }
        >
          <Settings className="w-5 h-5 mr-2" />
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
