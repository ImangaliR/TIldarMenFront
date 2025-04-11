import api from "../api";
import TokenService from "../token.service";

export const getProfile = () => {
  const userID = TokenService.getUserId();
  const userRole = TokenService.getUserRole();

  return new Promise((resolve, reject) => {
    const endpoint =
      userRole === "TRANSLATOR"
        ? `/translator/${userID}/profile`
        : `/employer/${userID}/profile`;
    api
      .get(endpoint)
      .then((response) => resolve(response.data))
      .catch((err) => {
        reject(err.response?.data || "Failed to fetch profile.");
      });
  });
};

export const getSettings = () => {
  const userID = TokenService.getUserId();
  const userRole = TokenService.getUserRole();

  return new Promise((resolve, reject) => {
    const endpoint =
      userRole === "TRANSLATOR"
        ? `/translator/${userID}/settings`
        : `/employer/${userID}/profile`;
    api
      .get(endpoint)
      .then((response) => resolve(response.data))
      .catch((err) => {
        reject(err.response?.data || "Failed to fetch settings.");
      });
  });
};

export const updateProfile = (profileData) => {
  const userRole = TokenService.getUserRole();
  const userID = TokenService.getUserId();
  return new Promise((resolve, reject) => {
    const endpoint =
      userRole === "TRANSLATOR"
        ? `/translator/${userID}/settings`
        : `/employer/${userID}/profile/update`;
    api
      .put(endpoint, profileData)
      .then((response) => {
        console.log("Profile updated successfully:", response.data);
        resolve(response.data);
      })
      .catch((err) => {
        console.error("Axios PUT Error:", err);
        reject(err.response?.data || "Failed to update profile.");
      });
  });
};

export const updateAvailability = (profileData) => {
  const userID = TokenService.getUserId();
  return new Promise((resolve, reject) => {
    const endpoint = `/translator/${userID}/profile`;
    api
      .put(endpoint, profileData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response?.data || "Failed to update profile.");
      });
  });
};

export const updatePassword = (passwordData) => {
  const userID = TokenService.getUserId();
  const userRole = TokenService.getUserRole();

  return new Promise((resolve, reject) => {
    const endpoint =
      userRole === "TRANSLATOR"
        ? `/translator/${userID}/password`
        : `/employer/${userID}/password`;
    api
      .put(endpoint, passwordData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response?.data);
      });
  });
};

export const deleteProfile = () => {
  const userID = TokenService.getUserId();
  const userRole = TokenService.getUserRole();

  return new Promise((resolve, reject) => {
    const endpoint =
      userRole === "TRANSLATOR"
        ? `/translator/${userID}/delete`
        : `/employer/${userID}/delete`;
    api
      .delete(endpoint)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        console.error("Axios PUT Error:", err);
        reject(err.response?.data || "Failed to delete user.");
      });
  });
};
