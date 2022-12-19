import { useCallStore, useSocketStore } from "@/store";
import { CALL_HANG_UP } from "@/configs/socket-events";

const useCallingContent = () => {
  const socket = useSocketStore((state) => state.socket);
  const receiver = useCallStore((state) => state.receiver);
  const caller = useCallStore((state) => state.caller);

  const handleCancelCall = () => {
    socket?.emit(CALL_HANG_UP, { receiver, caller });
  };

  return {
    receiver,
    handleCancelCall,
  };
};

export default useCallingContent;
