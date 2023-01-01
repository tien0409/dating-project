import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/configs/axios";

const _getAll = async () => (await axiosInstance.get("/premium-packages"))?.data;

export const usePremiumPackagesData = () => {
  return useQuery(["premiumPackages"], _getAll, {
    staleTime: Infinity,
  });
};
