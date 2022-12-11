import { useMutation, useQuery } from "@tanstack/react-query";

import axiosInstance from "@/configs/axios";
import { AxiosResponseType, CreateAccountType, GenderType, RQConfigsType } from "@/types";

const _createProfile = async (payload: CreateAccountType) =>
  await axiosInstance.post("/users/create-profile", payload);
export const useCreateProfileData = ({ onSuccess }: RQConfigsType) => {
  return useMutation(_createProfile, { onSuccess });
};
