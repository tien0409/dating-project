import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { AxiosResponseType } from "@/types";
import { useVerifyMailData } from "@/hooks/useMailData";
import { AUTH_ROUTE } from "@/configs/routes";

const useVerifyEmailView = () => {
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSuccess = (res: AxiosResponseType) => {
    setMessage(res.message);
  };

  const handleError = (error: any) => {
    setMessage(error?.message);
  };

  const { mutate, isSuccess } = useVerifyMailData({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const handleRedirectLogin = () => {
    if (isSuccess) localStorage.setItem("redirect", "login");
    router.push(AUTH_ROUTE);
  };

  useEffect(() => {
    if (router?.query?.token && typeof router.query.token === "string") {
      mutate(router.query.token);
    }
  }, [mutate, router.query.token]);

  return {
    message,
    handleRedirectLogin,
  };
};

export default useVerifyEmailView;
