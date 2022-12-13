import { useMutation, useQuery } from "@tanstack/react-query";

import axiosInstance from "@/configs/axios";
import { AxiosResponseType, CreateAccountType, RQConfigsType, UserAuthType } from "@/types";

const _createProfile = async (payload: CreateAccountType) =>
  await axiosInstance.post("/users/create-profile", payload);
const _getUsersExplore = async (page = 0) =>
  (
    await axiosInstance.get<AxiosResponseType<UserAuthType[]>>("/users/explore", {
      params: { page },
    })
  ).data;

export const useCreateProfileData = ({ onSuccess }: RQConfigsType) => {
  return useMutation(_createProfile, { onSuccess });
};

export const useGetUsersExploreData = (page = 0) => {
  return useQuery(["users-explore", page], () => _getUsersExplore(page));
};