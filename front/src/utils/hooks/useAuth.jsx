import { useState } from "react";
import api from "../../services/api";
import TokenService from "../../services/token.service";

export default function useAuth() {
  const [error, setError] = useState(null);

  const loginUser = async (data) => {
    try {
      const response = await api.post("/auth/sign-in", data);
      const accessToken = response.data.data.token;
      if (accessToken) {
        TokenService.updateLocalAccessToken(accessToken);
        api.defaults.headers["Authorization"] = "Bearer " + accessToken;
        return response.data;
      } else {
        throw new Error("No access token received");
      }
    } catch (err) {
      console.error(
        "❌ Login Error:",
        err.response?.data?.message || err.message
      );
      setError(err.response?.data || "Unknown error");
      return null;
    }
  };

  return {
    loginUser,
    error,
  };
}
