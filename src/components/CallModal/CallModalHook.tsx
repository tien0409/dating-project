import { useCallStore } from "@/store";

const useCallModal = () => {
  const callStatus = useCallStore((state) => state.callStatus);

  const open = callStatus === "calling" || callStatus === "receiving-call";

  return {
    open,
    callStatus,
  };
};

export default useCallModal;
