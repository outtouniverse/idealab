import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, LayoutDashboard, User, Settings, LogOut } from "lucide-react";

function DashboardNav({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      const response = await fetch("https://idealab-ax37.vercel.app/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      
      if (response.ok) {
        onLogout();
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/idealab", icon: LayoutDashboard, label: "IdeaLab" },
    { path: "/profile", icon: User, label: "Profile" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <nav className="bg-black/80 backdrop-blur-sm p-4 text-white sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-black hover:text-gray-300 transition-colors">
          IdeaLab
        </Link>
        
        <div className="flex items-center space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 hover:text-gray-300 transition-colors ${
                  isActive(item.path) ? "text-indigo-400" : ""
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNav; 