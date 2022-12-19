import { useState } from "react";

const useDeleteAccountModal = () => {
  const [open, setOpen] = useState(false);

  return { open, setOpen };
};

export default useDeleteAccountModal;
