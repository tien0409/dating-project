import axios from "axios";
import { getCookie, getCookies, setCookie } from "cookies-next";
import { toast } from "react-toastify";
import authRepository from "@/repositories/authRepository";
import jwtDecode from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    Authentication: getCookie("Authentication"),
    Refresh: getCookie("Refresh"),
  },
});

const axiosRefreshInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    Authentication: getCookie("Authentication"),
    Refresh: getCookie("Refresh"),
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const exp: any = getCookie("Authentication")
    ? (jwtDecode(getCookie("Authentication") as string) as any)?.exp
    : 0;
  if (exp < new Date().getTime() / 1000) {
    await axiosRefreshInstance.get("/auth/refresh");
  }

  return config;
});

axiosInstance.interceptors.response.use((config) => {
  return config;
});

export default axiosInstance;
