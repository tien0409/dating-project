import { AxiosInstance } from "axios";

import axiosInstance from "@/configs/axios";
import { LoginType } from "@/types/auth/LoginType";
import { SignUpType } from "@/types/auth/SignUpType";
import { AxiosResponseType } from "@/types/AxiosReponse";
import { AuthType } from "@/types/auth/AuthType";

type AuthRepository = {
  login: (body: LoginType) => Promise<AxiosResponseType<AuthType>>;
  signup: (body: SignUpType) => Promise<AxiosResponseType>;
};

function AuthRepository(axios: AxiosInstance): AuthRepository {
  return {
    login: async (body) => (await axios.post("/auth/signin", body)).data,
    signup: async (body) => (await axios.post("/auth/signup", body)).data,
  };
}

export default AuthRepository(axiosInstance);
