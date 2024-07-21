import React, { createContext, useState, useEffect, useContext } from "react";
import { login as loginApi, register as registerApi } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await loginApi(email, password);
      localStorage.setItem("token", response.token);
      setUser(response);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const signUp = async (firstName, lastName, email, password) => {
    try {
      const response = await registerApi(firstName, lastName, email, password);
      localStorage.setItem("token", response.token);
      setUser(response);
      return true;
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
