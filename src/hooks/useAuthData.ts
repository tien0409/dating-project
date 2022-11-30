import { useMutation, useQuery } from "@tanstack/react-query";

import {
  AuthType,
  AxiosResponseType,
  RQConfigsType,
  SignInType,
  SignUpType,
  UserAuthType,
} from "@/types";
import axiosInstance from "@/configs/axios";

const _signIn = async (body: SignInType) =>
  (await axiosInstance.post<AxiosResponseType<AuthType>>("/auth/signin", body))?.data;
const _signUp = async (body: SignUpType) =>
  (await axiosInstance.post<AxiosResponseType>("/auth/signup", body))?.data;
const _fetchUserAuth = async () =>
  (await axiosInstance.get<AxiosResponseType<UserAuthType>>("/auth/user-auth"))?.data;

export const useLoginData = ({ onSuccess, onError }: RQConfigsType) => {
  return useMutation(_signIn, { onSuccess, onError });
};

export const useRegisterData = ({ onSuccess, onError }: RQConfigsType) => {
  return useMutation(_signUp, { onSuccess, onError });
};

export const useFetchUserAuthData = ({ onSuccess, onError, enabled }: RQConfigsType) => {
  return useQuery(["user-auth"], _fetchUserAuth, { onSuccess, onError, enabled });
};
