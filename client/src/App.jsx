import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import IdeaLabPage from "./pages/IdeaLabPage";
import AllIdeaLabsPage from "./pages/AllIdeaLabsPage";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar"; // Import Navbar
import { ThemeProvider } from "./components/ui/theme-provider";
import IdeaLabDetailsPage from "./pages/IdeaLabDetailsPage";
import DashboardNav from "./components/DashboardNav";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status when the app loads
    fetch("https://idealab-ax37.vercel.app/auth/user", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(!!data.user);
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  const handleLogin = () => {
    window.location.href = "https://idealab-ax37.vercel.app/auth/google";
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("https://idealab-ax37.vercel.app/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      
      if (response.ok) {
        setIsAuthenticated(false);
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col min-h-screen font-['Inter_variable_Text_Thin'] bg-gray-100 dark:bg-black">
        {isAuthenticated ? (
          <DashboardNav onLogout={handleLogout} />
        ) : (
          <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        )}
        <main className="flex-grow p-6">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <LandingPage />
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <LoginPage onLogin={handleLogin} />
                )
              }
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <SettingsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/idealab"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <IdeaLabPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/idealab/:id"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <IdeaLabDetailsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/idealabs"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AllIdeaLabsPage />
                </PrivateRoute>
              }
            />
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
