/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const API_URL = "http://localhost:3000/auth/";

const register = (data) => {
  return axios.post(API_URL + "signup", data);
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.access_token) {
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.access_token)
        );
        localStorage.setItem("role", JSON.stringify(response.data.role));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

export default {
  register,
  login,
  logout,
};
