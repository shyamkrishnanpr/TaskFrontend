// src/components/PrivateRoute.js

import { useAuth } from "../contexts/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return !user ? children : <Navigate to="/task" />;
};

export { PrivateRoute, PublicRoute };
