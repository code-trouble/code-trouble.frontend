import axios from "axios";

const apiBaseUrl = import.meta.env.DEV
  ? "http://localhost:8080"
  : import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
