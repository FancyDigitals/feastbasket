import axios from "axios";
import { env } from "./env";

export const axiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("feast-basket-token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});