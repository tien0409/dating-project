import { createContext, ReactNode, useCallback, useEffect, useState } from "react";

import authRepository from "@/src/repositories/authRepository";
import { UserAuthType } from "@/src/types/auth/UserAuthType";

type AuthContextType = Partial<{
  isLoading: boolean;
  isAuthenticated: boolean;
  profile: UserAuthType;
  updateProfile: (profile: UserAuthType) => void;
}>;

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  profile: {},
});

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

  const updateProfile = useCallback((profilePartial: UserAuthType) => {
    setAuthState((prevState) => ({
      ...prevState,
      profile: profilePartial,
    }));
  }, []);

  const getUserAuth = useCallback(async () => {
    const res = await authRepository.getUserAuth();

    setAuthState((prevState) => ({
      ...prevState,
      isAuthenticated: true,
      profile: res.data,
      isLoading: false,
    }));
  }, []);

  useEffect(() => {
    getUserAuth();
  }, [getUserAuth]);

  return (
    <AuthContext.Provider value={{ ...authState, updateProfile }}>{children}</AuthContext.Provider>
  );
};
