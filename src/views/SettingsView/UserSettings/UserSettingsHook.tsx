import { useState } from "react";

import { useAuthStore } from "@/store";

const useUserSettings = () => {
  const profile = useAuthStore((state) => state.profile);

  const [open, setOpen] = useState(false);

  return {
    open,
    setOpen,
    profile,
  };
};

export default useUserSettings;
