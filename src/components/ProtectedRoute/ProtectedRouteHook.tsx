import { toast } from "react-toastify";
import { useRouter } from "next/router";

import userStore from "@/store/userStore";
import { useFetchUserAuthData } from "@/hooks/useAuthData";
import { AxiosResponseType, UserAuthType } from "@/types";
import { AUTH_ROUTE } from "@/configs/routes";

const useProtectedRoute = () => {
  const router = useRouter();
  const store = userStore();

  const handleSuccess = async (res: AxiosResponseType<UserAuthType>) => {
    if (res.data) {
      store.setProfile(res.data);
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
