import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import useCancelPromise from "@/hooks/useCancelPromise";
import authRepository from "@/repositories/authRepository";
import { AUTH_ROUTE } from "@/configs/routes";

const useDefaultLayout = () => {
  const router = useRouter();

  const getUserAuth = useCallback(async () => {
    try {
      const res = await authRepository.getUserAuth();
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
      router.push(AUTH_ROUTE);
    }
  }, []);

  useEffect(() => {
    console.log("use effect")
    getUserAuth();
  }, []);
};

export default useDefaultLayout;
