import { AxiosInstance } from "axios";

import axiosInstance from "@/configs/axios";
import { AxiosResponseType } from "@/types/AxiosReponse";

type MailRepositoryType = {
  sendVerifyEmail: () => Promise<AxiosResponseType<void>>;
};

function MailRepository(axios: AxiosInstance): MailRepositoryType {
  return {
    sendVerifyEmail: async () => (await axios.post("/mail/verify-mail"))
  };
}

export default MailRepository(axiosInstance);
