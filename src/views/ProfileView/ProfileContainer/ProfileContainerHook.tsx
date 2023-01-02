import { useState } from "react";

const useProfileContainer = () => {
  const [open, setOpen] = useState(false);

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  return { open, handleToggleOpen };
};

export default useProfileContainer;
