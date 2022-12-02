import { useEffect, useState } from "react";

import { FormType } from "./index";

const useAuthViewHook = () => {
  const [isModalOpen, setIsModalOpen] = useState(() => {
    // check when verify email
    return !!(typeof window !== "undefined" && localStorage?.getItem("redirect"));
  });
  const [formType, setFormType] = useState<FormType>("LoginForm");

  // const store = useStore();

  const handleOpenForm = (formType: FormType) => () => {
    setIsModalOpen(true);
    setFormType(formType);
  };

  const handleCloseForm = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // if (store.profile) window.location.pathname = DATING_ROUTE;
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
