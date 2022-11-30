import { toast } from "react-toastify";
import { useRouter } from "next/router";

import useStore from "@/store";
import { useFetchUserAuthData } from "@/hooks/useAuthData";
import { UserAuthType } from "@/types";
import { AUTH_ROUTE } from "@/configs/routes";

const useProtectedRoute = () => {
  const router = useRouter();
  const store = useStore();

  const handleSuccess = (profile: UserAuthType) => {
    store.setProfile(profile);
  };

  const handleError = async (error: any) => {
    toast.error(error?.message);
    await router.push(AUTH_ROUTE);
  };

  const { isLoading } = useFetchUserAuthData({ onSuccess: handleSuccess, onError: handleError });

  return { isLoading };
};

export default useProtectedRoute;
