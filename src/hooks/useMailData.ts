import { useMutation } from "@tanstack/react-query";

import axiosInstance from "@/configs/axios";
import { AxiosResponseType, RQConfigsType } from "@/types";

const _verifyMail = async (token: string) =>
  (await axiosInstance.post<AxiosResponseType>("/mail/verify-mail/" + token))?.data;

export const useVerifyMailData = ({ onSuccess, onError }: RQConfigsType) => {
  return useMutation(_verifyMail, { onSuccess, onError });
};
