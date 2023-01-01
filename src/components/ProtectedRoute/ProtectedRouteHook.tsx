import { toast } from "react-toastify";
import { useRouter } from "next/router";

import useAuthStore from "@/store/useAuthStore";
import { useFetchUserAuthData } from "@/hooks/useAuthData";
import { AxiosResponseType, UserType } from "@/types";
import { AUTH_ROUTE } from "@/configs/routes";

const useProtectedRoute = () => {
  const router = useRouter();

  const useStore = useAuthStore();

  const handleSuccess = async (res: AxiosResponseType<UserType>) => {
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
