import { useState } from "react";

const useMoreInformationItem = () => {
  const [open, setOpen] = useState(false);

  return { open, setOpen };
};

export default useMoreInformationItem;
