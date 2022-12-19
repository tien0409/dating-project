import { useState } from "react";

const useAdvanceFilterItem = () => {
  const [open, setOpen] = useState(false);

  return { open, setOpen };
};

export default useAdvanceFilterItem;
