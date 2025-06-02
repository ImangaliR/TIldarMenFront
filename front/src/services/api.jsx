import axios from "axios";
import TokenService from "./token.service";

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

// Interceptor for adding token to requests
api.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async function (error) {
    const originalConfig = error?.response?.config;

    if (error.toJSON().message === "Network Error") {
      // alert('No internet connection');
      return Promise.reject(error);
    }

    if (
      error?.response?.status === 401 &&
      !originalConfig?.url?.includes("/auth/sign-in")
    ) {
      TokenService.removeTokens();
      window.location.href = "/login";
      return Promise.reject("Session expired. Redirecting to login.");
    }

    return Promise.reject(error);
  }
);

export default api;
