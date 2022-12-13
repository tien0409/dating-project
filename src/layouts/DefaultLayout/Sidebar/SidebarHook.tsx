import { useCallback } from "react";
import { deleteCookie } from "cookies-next";

import { AUTH_ROUTE } from "@/configs/routes";
import useAuthStore from "@/store/useAuthStore";

const useSidebar = () => {
  const profile = useAuthStore((state) => state.profile);

  const handleLogout = useCallback(() => {
    deleteCookie("Authentication");
    deleteCookie("Refresh");
    document.location.href = AUTH_ROUTE;
  }, []);

  return {
    profile,
    handleLogout,
  };
};

export default useSidebar;
