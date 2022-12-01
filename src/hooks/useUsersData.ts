import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/configs/axios";
import { CreateAccountType, RQConfigsType } from "@/types";

const _createProfile = async (payload: CreateAccountType) =>
  await axiosInstance.post("/users/create-profile", payload);

export const useCreateProfileData = ({ onSuccess, onError }: RQConfigsType) => {
  return useMutation(_createProfile, { onSuccess, onError });
};
