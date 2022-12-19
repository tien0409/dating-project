import { useState } from "react";

const useSettingContainer = () => {
  const [open, setOpen] = useState(false);

  const handleToggleOpen = () => {
    setOpen(!open);
  };

  return { open, handleToggleOpen };
};

export default useSettingContainer;
