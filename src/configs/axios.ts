import axios from "axios";
import { getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authentication: getCookie("Authentication"),
    Refresh: getCookie("Refresh"),
  },
});

const axiosRefreshInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authentication: getCookie("Authentication"),
    Refresh: getCookie("Refresh"),
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const exp: number = getCookie("Authentication")
      ? (jwtDecode(getCookie("Authentication") as string) as any)?.exp
      : 0;
    if (exp < new Date().getTime() / 1000 && getCookie("Refresh")) {
      try {
        await axiosRefreshInstance.get("/auth/refresh");
      } catch (err: any) {
        console.log("err");
      }
    }

    return config;
  },
  (err: any) => {
    const { statusCode, message } = err.response.data;
    Promise.reject({ statusCode, message });
  },
);

axiosInstance.interceptors.response.use((config) => {
  return config;
});

export default axiosInstance;
