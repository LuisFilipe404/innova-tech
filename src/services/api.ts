import axios from "axios";

export const api = axios.create({
  baseURL: "https://randomuser.me/api/",
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
