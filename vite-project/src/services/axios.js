import axios from "axios";

let base = import.meta.env.VITE_CALLBACK_URL;
const api = axios.create({
  baseURL: `${base}`,
  // baseURL: "https://taskbackend-4xj1.onrender.com",

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
