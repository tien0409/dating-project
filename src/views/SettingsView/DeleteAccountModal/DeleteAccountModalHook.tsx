import { useState } from "react";
import { toast } from "react-toastify";

import { useDeleteAccountData } from "@/hooks/useUsersData";
import { AUTH_ROUTE } from "@/configs/routes";

const useDeleteAccountModal = () => {
  const [open, setOpen] = useState(false);

  const { mutateAsync } = useDeleteAccountData();

  const handleDelete = async () => {
    try {
      await mutateAsync();
      toast.success("Account deleted successfully");
      document.location.href = AUTH_ROUTE;
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Something went wrong");
    }
  };

  return { open, setOpen, handleDelete };
};

export default useDeleteAccountModal;
