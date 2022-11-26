import { useEffect, useState } from "react";

import { FormType } from "./index";

const useAuthViewHook = () => {
  const [isModalOpen, setIsModalOpen] = useState(() => {
    // check when verifiy email
    if (typeof window !== "undefined" && localStorage?.getItem("redirect")) {
      return true;
    }
    return false;
  });
  const [formType, setFormType] = useState<FormType>("LoginForm");

  const handleOpenForm = (formType: FormType) => () => {
    setIsModalOpen(true);
    setFormType(formType);
  };

  const handleCloseForm = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("redirect")) {
      localStorage.removeItem("redirect");
    }
  }, []);

  return {
    isModalOpen,
    formType,
    setFormType,
    handleOpenForm,
    handleCloseForm,
  };
};

export default useAuthViewHook;
