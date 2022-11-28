import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

import authRepository from "@/src/repositories/authRepository";
import { UserAuthType } from "@/src/types/auth/UserAuthType";
import { AUTH_ROUTE } from "@/src/configs/routes";

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

  const getUserAuth = useCallback(async () => {
    try {
      const res = await authRepository.getUserAuth();
      setAuthState((prevState) => ({
        ...prevState,
        isAuthenticated: true,
        profile: res.data,
        isLoading: false,
      }));
    } catch (err: any) {
      deleteCookie("Authentication");
      deleteCookie("Refresh");
      toast.error(err?.response?.data?.message);
      router.push(AUTH_ROUTE);
    }
  }, [router]);

  useEffect(() => {
    getUserAuth();
  }, [getUserAuth]);

  return (
    <AuthContext.Provider value={{ ...authState, updateProfile }}>{children}</AuthContext.Provider>
  );
};
