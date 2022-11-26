import { useContext, useEffect, useState } from "react";

import { FormType } from "./index";
import { AuthContext } from "@/src/contexts/authContext";
import { DATING_ROUTE } from "@/src/configs/routes";

const useAuthViewHook = () => {
  const [isModalOpen, setIsModalOpen] = useState(() => {
    // check when verifiy email
    if (typeof window !== "undefined" && localStorage?.getItem("redirect")) {
      return true;
    }
    return false;
  });
  const [formType, setFormType] = useState<FormType>("LoginForm");

  const { isAuthenticated } = useContext(AuthContext);

  const handleOpenForm = (formType: FormType) => () => {
    setIsModalOpen(true);
    setFormType(formType);
  };

  const handleCloseForm = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isAuthenticated) window.location.pathname = DATING_ROUTE;
    if (typeof window !== "undefined" && localStorage.getItem("redirect")) {
      localStorage.removeItem("redirect");
    }
  }, [isAuthenticated]);

  return {
    isModalOpen,
    formType,
    setFormType,
    handleOpenForm,
    handleCloseForm,
  };
};

export default useAuthViewHook;
