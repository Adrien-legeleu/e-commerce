// src/config/api.ts

import axios from "axios";

const isDev = true;
const devUrl = "http://localhost:5080";

export const api = axios.create({
  baseURL: isDev ? devUrl : "prodUrl",
});
