import api from "../api";

export const createAccount = (userData) => {
  return new Promise((resolve, reject) => {
    api
      .post("/users/add", userData)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        if (
          err.response &&
          err.response.data &&
          err.response.data.message &&
          err.response.data.message.includes("User Already Exists")
        ) {
          reject("❌ User with this Email already exists.");
        } else {
          reject(err.response?.data?.message || "Registration failed.");
        }
      });
  });
};
