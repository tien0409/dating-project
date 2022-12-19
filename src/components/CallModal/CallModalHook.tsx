import { useCallStore } from "@/store";

const useCallModal = () => {
  const callStatus = useCallStore((state) => state.callStatus);

  const open = ["calling", "receiving-call", "unavailable", "rejected"].includes(callStatus);

  return {
    open,
    callStatus,
  };
};

export default useCallModal;
