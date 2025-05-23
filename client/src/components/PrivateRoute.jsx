import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    fetch("https://idealab-ax37.vercel.app//auth/user", { credentials: "include" })
      .then(res => res.json())
      .then(data => setIsAuthenticated(!!data.user))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

export default PrivateRoute;
