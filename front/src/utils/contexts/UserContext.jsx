import { createContext, useContext, useState, useEffect } from "react";
import TokenService from "../../services/token.service";
import { getProfile } from "../../services/ProfileService/ProfileService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(TokenService?.getUserRole || null);
  const [userId, setUserId] = useState(TokenService?.getUserId || null);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = TokenService.getLocalAccessToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.name) {
        setUser(storedUser); // ✅ Load only user details
        setIsLoading(false);
        return;
      }

      try {
        const profile = await getProfile();
        setUser(profile);
        localStorage.setItem("user", JSON.stringify(profile)); // ✅ Store only profile, no token
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []); // ✅ Runs only once

  // Function to login user and store in context + localStorage
  const login = async (userData) => {
    //setUser(userData);
    //localStorage.setItem("user", JSON.stringify(userData));
    if (!TokenService.getLocalAccessToken()) return; // ✅
    try {
      const profile = await getProfile();
      setUser(profile);
      setUserRole(TokenService.getUserRole());
      setUserId(TokenService.getUserId());
      localStorage.setItem("user", JSON.stringify(profile));
    } catch (error) {
      console.error("Failed to fetch profile after login:", error);
    }
  };

  // Function to logout user
  const logout = () => {
    setUser(null);
    setUserRole(null);
    setUserId(null);
    localStorage.removeItem("user");
    TokenService.removeTokens();
  };

  return (
    <UserContext.Provider
      value={{ userId, userRole, user, setUser, isLoading, login, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook to use User Context
export const useUser = () => {
  return useContext(UserContext);
};
