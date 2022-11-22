import { AxiosInstance, AxiosRequestConfig } from "axios";

import axiosInstance from "@/configs/axios";
import { AxiosResponseType } from "@/types/AxiosReponse";

type MailRepositoryType = {
  sendVerifyMail: () => Promise<AxiosResponseType<void>>;
  verifyMail: (configs: AxiosRequestConfig, token: string) => Promise<AxiosResponseType<any>>;
};

function MailRepository(axios: AxiosInstance): MailRepositoryType {
  return {
    sendVerifyMail: async () => await axios.post("/mail/send-verify-mail"),
    verifyMail: async (configs: AxiosRequestConfig, token: string) =>
      (await axios.post("/mail/verify-mail/" + token, configs)).data,
  };
}

export default MailRepository(axiosInstance);
