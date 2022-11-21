import { AxiosInstance, AxiosRequestConfig } from "axios";

import axiosInstance from "@/configs/axios";
import { AxiosResponseType } from "@/types/AxiosReponse";

type MailRepositoryType = {
  sendVerifyEmail: (headers: any) => Promise<AxiosResponseType<void>>;
};

function MailRepository(axios: AxiosInstance): MailRepositoryType {
  return {
    sendVerifyEmail: async (configs: AxiosRequestConfig) => await axios.post("/mail/send-verify-mail", {}, configs),
  };
}

export default MailRepository(axiosInstance);
