import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    window.location.assign("http://localhost:3000/auth/google");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col min-h-screen font-['Inter_variable_Text_Thin'] bg-gray-100 dark:bg-black">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
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
              element={<LoginPage onLogin={handleLogin} />}
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
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
                <PrivateRoute>
                  <IdeaLabDetailsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/idealabs"
              element={
                <PrivateRoute>
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
