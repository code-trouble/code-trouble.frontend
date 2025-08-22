import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const apiBaseUrl = import.meta.env.DEV
  ? "http://localhost:3000"
  : import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let onTokenExpired: (() => void) | null = null;

export const setTokenExpiredHandler = (handler: () => void) => {
  onTokenExpired = handler;
};

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
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      useAuthStore.getState().logout();
      if (onTokenExpired) {
        onTokenExpired();
      }
    }
    return Promise.reject(error);
  },
);
