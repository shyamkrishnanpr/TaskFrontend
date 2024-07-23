import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "../components/auth/SignUp";
import Login from "../components/auth/Login";
import TaskManager from "../components/taskboard/TaskManager";
import { PublicRoute, PrivateRoute } from "../components/privateRoute";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/task"
          element={
            <PrivateRoute>
              <TaskManager />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default Router;
