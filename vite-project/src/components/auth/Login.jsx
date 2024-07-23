import React, { useState, useContext } from "react";
import Navbar from "../navbar/Navbar";
import { useAuth } from "../../contexts/AuthContext";
import GoogleAuthButton from "./GoogleLoginButton";
import { Link } from "react-router-dom";

import "./signup.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const { login, getUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  let callbackUrl = import.meta.env.VITE_CALLBACK_URL;
  const googleAuth = async () => {
    window.open(`${callbackUrl}/api/auth/google/callback`, "_self");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setErrors(null);
    const success = await login(email, password);
    if (success) {
      navigate("/task");
    } else {
      setErrors({ apierr: "Server error. Please try again later." });
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors?.email && <p>{errors?.email}</p>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors?.password && <p>{errors?.password}</p>}
          {errors?.apierr && <p>{errors?.apierr}</p>}
        </div>
        <button type="submit">Login</button>

        <Link to="/signup"> Don't have account? register here...</Link>
        <button className="google-auth-button" onClick={googleAuth}>
          <img
            style={{ width: "30px", marginRight: "10px" }}
            src="./googlee.png"
            alt="google icon"
          />
          <span>Sign in with Google</span>
        </button>
      </form>
    </>
  );
};

export default Login;
