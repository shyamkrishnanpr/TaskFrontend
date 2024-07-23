import React, { createContext, useState, useEffect, useContext } from "react";
import { login as loginApi, register as registerApi } from "../services/api";
import axios from "../services/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(token);
    }
  }, []);

  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/auth/login/success", {
        withCredentials: true,
      });
      setUser(data.user._json);
      return true;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
  const googleLogin = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      console.log("here");
      const res = await axios.post("/api/auth/google", { token: credential });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signUp, logout, googleLogin, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
