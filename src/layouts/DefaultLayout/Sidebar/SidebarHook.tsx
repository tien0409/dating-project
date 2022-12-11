import { useCallback } from "react";
import { deleteCookie } from "cookies-next";

import { AUTH_ROUTE } from "@/configs/routes";
import useUserStore from "@/store/useUserStore";

const useSidebar = () => {
  const profile = useUserStore((state) => state.profile);

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
