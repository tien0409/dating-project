import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

import { AxiosResponseType, UserAuthType } from "@/types";
import { AUTH_ROUTE } from "@/configs/routes";
import { useFetchUserAuthData } from "@/hooks/useAuthData";

type AuthContextType = Partial<{
  isLoading: boolean;
  isAuthenticated: boolean;
  profile: UserAuthType;
  updateProfile: (_profile: UserAuthType) => void;
}>;

export const initAuthContext: AuthContextType = {
  isAuthenticated: false,
  profile: {},
};

export const AuthContext = createContext<AuthContextType>(initAuthContext);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;

  const [authState, setAuthState] = useState<AuthContextType>({
    isLoading: true,
    isAuthenticated: false,
    profile: {},
  });

  const router = useRouter();

  const updateProfile = useCallback((profilePartial: UserAuthType) => {
    setAuthState((prevState) => ({
      ...prevState,
      profile: profilePartial,
    }));
  }, []);

  const handleSuccess = (res: AxiosResponseType<UserAuthType>) => {
    setAuthState((prevState) => ({
      ...prevState,
      isAuthenticated: true,
      profile: res.data,
      isLoading: false,
    }));
  };

  const handleError = (error: any) => {
    deleteCookie("Authentication");
    deleteCookie("Refresh");
    toast.error(error?.response?.data?.message);
    router.push(AUTH_ROUTE);
  };

   useFetchUserAuthData({ onSuccess: handleSuccess, onError: handleError });

  return (
    <AuthContext.Provider value={{ ...authState, updateProfile }}>{children}</AuthContext.Provider>
  );
};
