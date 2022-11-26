import { useMemo } from "react";

const useConversation = () => {
  const controlOptions = useMemo(
    () => [
      { key: "1", label: <div>Block</div> },
      { key: "2", label: <div>Call video</div> },
      { key: "3", label: <div>Delete</div> },
    ],
    [],
  );

  return {
    controlOptions,
  };
};

export default useConversation;
