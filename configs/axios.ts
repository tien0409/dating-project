import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
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
  },
);

export default axiosInstance;
