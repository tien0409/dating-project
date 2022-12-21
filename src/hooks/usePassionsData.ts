import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/configs/axios";
import { AxiosResponseType, PassionType } from "@/types";

const _getPassions = async () =>
  (await axiosInstance.get<AxiosResponseType<PassionType[]>>("/passions"))?.data;

export const usePassionsData = () => {
  return useQuery(["passions"], _getPassions, { staleTime: Infinity });
};
