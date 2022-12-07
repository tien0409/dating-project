import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";

import useUserStore from "@/store/useUserStore";
import { useFetchUserAuthData } from "@/hooks/useAuthData";
import { AxiosResponseType, UserAuthType } from "@/types";
import { AUTH_ROUTE } from "@/configs/routes";
import { useSocketStore } from "@/store";

const useProtectedRoute = () => {
  const router = useRouter();

  const useStore = useUserStore();

  const handleSuccess = async (res: AxiosResponseType<UserAuthType>) => {
    if (res.data) {
      useStore.setProfile(res.data);
    }
  };

  const handleError = async (error: any) => {
    toast.error(error?.message);
    await router.push(AUTH_ROUTE);
  };

  const { isLoading } = useFetchUserAuthData({ onSuccess: handleSuccess, onError: handleError });

  return { isLoading };
};

export default useProtectedRoute;
