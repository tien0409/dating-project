import { useCallback } from "react";
import { deleteCookie } from "cookies-next";

import { AUTH_ROUTE } from "@/configs/routes";
import useStore from "@/store";

const useSidebar = () => {
  const store = useStore();

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
