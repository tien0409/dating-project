import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/configs/axios";
import { RQConfigsType } from "@/types";

const _getMatches = async () => {
  return (await axiosInstance.get("/user-matches")).data;
};

export const useUserMatchesData = ({ onSuccess, enabled }: RQConfigsType) => {
  return useQuery(["user-matches"], _getMatches, { staleTime: Infinity, onSuccess, enabled });
};
