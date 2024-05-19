import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the auth token if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
