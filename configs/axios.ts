import axios from "axios";
import { getCookie, getCookies } from "cookies-next";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authentication: getCookie("Authentication"),
    Refresh: getCookie("Refresh"),
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    /* if (typeof window !== "undefined") { */
    /* } */

    return config;
  },
  (err) => Promise.reject(err),
);

axiosInstance.interceptors.response.use(
  (config) => {
    /* if (typeof window !== "undefined") { */
    /* } */

    return config;
  },
  (err) => {
    if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    }
    return Promise.reject(err);
  },
);

export default axiosInstance;
