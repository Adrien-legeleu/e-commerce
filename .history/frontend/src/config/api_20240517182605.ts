import axios from "axios";

const isDev = true;
const devUrl = "http://localhost:5000";

export const api = axios.create({
  baseURL: isDev ? devUrl : "prodUrl",
});

api.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("authtoken");
    if (authToken) {
      config.headers.Authorization = ` Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
