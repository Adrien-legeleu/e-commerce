import axios from "axios";

const isDev = process.env.NODE_ENV === "development";

export const api = axios.create({
  baseURL: isDev ? "http://localhost:5000/api" : "prodUrl",
  withCredentials: true,
});

api.interceptors.request.use(
  (config: any) => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
