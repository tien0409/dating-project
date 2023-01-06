import { useMutation, useQuery } from "@tanstack/react-query";

import axiosInstance from "@/configs/axios";
import {
  AxiosResponseType,
  CreateAccountType,
  CreateUserPhotoType,
  ResUserExploresType,
  RQConfigsType,
  UpdatePasswordType,
  UpdateUserPhotoType,
  UserPhotoType,
} from "@/types";

const _createProfile = async (payload: CreateAccountType) =>
  await axiosInstance.post("/users/create-profile", payload);
const _updateProfile = async (payload: any) =>
  await axiosInstance.patch("/users/update-profile", payload);
const _updatePassword = async (payload: UpdatePasswordType) =>
  await axiosInstance.patch("/auth/update-password", payload);
const _createPhoto = async (payload: CreateUserPhotoType) =>
  await axiosInstance.post("/users/create-photo", payload);
const _updatePhoto = async ({ id, link }: UpdateUserPhotoType) =>
  await axiosInstance.patch("/users/update-photo/" + id, { link });
const _deletePhoto = async (id: string) =>
  await axiosInstance.delete<AxiosResponseType<UserPhotoType[]>>("/users/delete-photo/" + id);
const _getUsersExplore = async (page: number) =>
  (
    await axiosInstance.get<AxiosResponseType<ResUserExploresType>>("/users/explore", {
      params: { page },
    })
  ).data;
const _deleteAccount = async () => await axiosInstance.delete("/users/delete-account");

export const useCreateProfileData = ({ onSuccess }: RQConfigsType) => {
  return useMutation(_createProfile, { onSuccess });
};

export const useUpdateProfileData = (props?: RQConfigsType) => {
  const { onSuccess, onError } = props || {};
  return useMutation(_updateProfile, { onError, onSuccess });
};

export const useUpdatePasswordData = ({ onError, onSuccess }: RQConfigsType) => {
  return useMutation(_updatePassword, { onError, onSuccess });
};

export const useCreatePhotoData = () => {
  return useMutation(_createPhoto);
};

export const useUpdatePhotoData = () => {
  return useMutation(_updatePhoto);
};

export const useDeletePhotoData = () => {
  return useMutation(_deletePhoto);
};

export const useGetUsersExploreData = (page = 1, { onSuccess }: RQConfigsType) => {
  return useQuery(["user-explores", page], () => _getUsersExplore(page), {
    staleTime: Infinity,
    onSuccess,
  });
};

export const useDeleteAccountData = () => {
  return useMutation(_deleteAccount);
};
