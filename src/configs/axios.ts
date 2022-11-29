import axios from "axios";

import { AUTH_ROUTE } from "./routes";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.message.includes("Please try again") &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await axiosInstance.get("/auth/refresh");
        return axiosInstance(originalRequest);
      } catch (err) {
        if (document.location.pathname !== AUTH_ROUTE) document.location.href = AUTH_ROUTE;
        return Promise.reject(error?.response?.data);
      }
    }

    return Promise.reject(error?.response?.data);
  },
);

export default axiosInstance;
