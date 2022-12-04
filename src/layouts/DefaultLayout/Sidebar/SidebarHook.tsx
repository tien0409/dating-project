import { useCallback } from "react";
import { deleteCookie } from "cookies-next";

import { AUTH_ROUTE } from "@/configs/routes";
import useUserStore from "@/store/useUserStore";

const useSidebar = () => {
  const store = useUserStore();

  const handleLogout = useCallback(() => {
    deleteCookie("Authentication");
    deleteCookie("Refresh");
    document.location.href = AUTH_ROUTE;
  }, []);

  return {
    store,
    handleLogout,
  };
};

export default useSidebar;
