import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/configs/axios";
import { AxiosResponseType, GenderType, RQConfigsType } from "@/types";

const _getGenders = async () =>
  (await axiosInstance.get<AxiosResponseType<GenderType[]>>("/genders"))?.data;

export const useGendersData = ({ onSuccess }: RQConfigsType) => {
  return useQuery(["gender"], _getGenders, { staleTime: Infinity, onSuccess });
};
