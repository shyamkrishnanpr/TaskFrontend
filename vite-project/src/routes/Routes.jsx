import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "../components/auth/SignUp";
import Login from "../components/auth/Login";
import TaskManager from "../components/taskboard/TaskManager";
import PrivateRoute from "../components/privateRoute";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/task" element={<TaskManager />} />
        <Route exact path="/" component={Login} />
      </Routes>
    </div>
  );
};

export default Router;
