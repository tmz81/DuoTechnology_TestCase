import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.7:3000/",
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.log("Error:", error);
    return Promise.reject(error);
  }
);

export default api;
