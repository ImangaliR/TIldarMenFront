import { jwtDecode } from "jwt-decode"; // Install this with `npm install jwt-decode`

const getLocalRefreshToken = () => localStorage.getItem("refreshToken");

const getLocalAccessToken = () => localStorage.getItem("accessToken");

const updateLocalAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

const updateLocalRefreshToken = (token) => {
  localStorage.setItem("refreshToken", token);
};

const removeTokens = () => {
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
};

// ✅ New function to decode the JWT and get user details
const getDecodedToken = () => {
  const token = getLocalAccessToken();
  if (!token) return null;

  try {
    return jwtDecode(token); // Decode the JWT
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// ✅ Extract user role from the decoded token
const getUserRole = () => {
  const decodedToken = getDecodedToken();
  return decodedToken?.roles[0] || null; // If no role found, return null
};

// ✅ Extract user ID from the token (if needed)
const getUserId = () => {
  const decodedToken = getDecodedToken();
  return decodedToken?.id || null; // If no ID found, return null
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  updateLocalRefreshToken,
  removeTokens,
  getDecodedToken,
  getUserRole,
  getUserId, // Optional: If you need user ID
};

export default TokenService;
