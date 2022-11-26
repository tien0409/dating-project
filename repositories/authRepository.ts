import { AxiosInstance } from "axios";

import axiosInstance from "@/configs/axios";
import { LoginType } from "@/types/auth/LoginType";
import { SignUpType } from "@/types/auth/SignUpType";
import { AxiosResponseType } from "@/types/AxiosReponse";
import { AuthType } from "@/types/auth/AuthType";
import { UserAuthType } from "@/types/auth/UserAuthType";

type AuthRepositoryType = {
  login: (body: LoginType) => Promise<AxiosResponseType<AuthType>>;
  signup: (body: SignUpType) => Promise<AxiosResponseType>;
  refresh: () => Promise<AxiosResponseType<AuthType>>;
  getUserAuth: () => Promise<AxiosResponseType<UserAuthType>>;
};

function AuthRepository(axios: AxiosInstance): AuthRepositoryType {
  return {
    login: async (body) => (await axios.post("/auth/signin", body)).data,
    signup: async (body) => (await axios.post("/auth/signup", body)).data,
    refresh: async () => (await axios.get("/auth/refresh")).data,
    getUserAuth: async () => (await axios.get("/auth/user-auth"))?.data,
  };
}

export default AuthRepository(axiosInstance);
