import api from "../api";

export const uploadService = async (file, userId, userRole) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const endpoint =
      userRole === "TRANSLATOR"
        ? `/translator/${userId}/profile-image`
        : `/employer/${userId}/profile-image`;

    const profileResponse = await api.put(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (profileResponse.data.message !== "Success") {
      throw new Error("Profile update failed.");
    }
    return profileResponse.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
