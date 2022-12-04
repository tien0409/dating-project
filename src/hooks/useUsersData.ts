import { useMutation, useQuery } from "@tanstack/react-query";

import axiosInstance from "@/configs/axios";
import { AxiosResponseType, CreateAccountType, GenderType, RQConfigsType } from "@/types";

const _createProfile = async (payload: CreateAccountType) =>
  await axiosInstance.post("/users/create-profile", payload);
const _getGenders = async () =>
  (await axiosInstance.get<AxiosResponseType<GenderType[]>>("/users/genders"))?.data;

export const useCreateProfileData = ({ onSuccess }: RQConfigsType) => {
  return useMutation(_createProfile, { onSuccess });
};

export const useGendersData = () => {
  return useQuery(["genders"], _getGenders);
};
