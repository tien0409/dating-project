import { useCallback } from "react";
import { deleteCookie } from "cookies-next";

import { AUTH_ROUTE } from "@/configs/routes";
import userStore from "@/store/userStore";

const useSidebar = () => {
  const store = userStore();

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
