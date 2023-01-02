import { useMutation, useQuery } from "@tanstack/react-query";

import axiosInstance from "@/configs/axios";
import { AxiosResponseType, CreateAccountType, ResUserExploresType, RQConfigsType } from "@/types";

const _createProfile = async (payload: CreateAccountType) =>
  await axiosInstance.post("/users/create-profile", payload);
const _updateProfile = async (payload: any) =>
  await axiosInstance.patch("/users/update-profile", payload);
const _getUsersExplore = async (page: number) =>
  (
    await axiosInstance.get<AxiosResponseType<ResUserExploresType>>("/users/explore", {
      params: { page },
    })
  ).data;

export const useCreateProfileData = ({ onSuccess }: RQConfigsType) => {
  return useMutation(_createProfile, { onSuccess });
};

export const useUpdateProfileData = ({ onError, onSuccess }: RQConfigsType) => {
  return useMutation(_updateProfile, { onError, onSuccess });
};

export const useGetUsersExploreData = (page = 1, { onSuccess }: RQConfigsType) => {
  return useQuery(["user-explores", page], () => _getUsersExplore(page), {
    staleTime: Infinity,
    onSuccess,
  });
};
