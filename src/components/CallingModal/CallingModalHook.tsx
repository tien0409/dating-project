import { HandleCallType } from "@/types";
import { useAuthStore, useCallStore, useSocketStore } from "@/store";
import { VIDEO_CALL_ACCEPTED, VIDEO_CALL_REJECTED } from "@/configs/socket-events";

const useCallingModal = () => {
  const socket = useSocketStore((state) => state.socket);
  const callStatus = useCallStore((state) => state.callStatus);
  const caller = useCallStore((state) => state.caller);

  const handleCall = (type: HandleCallType) => () => {
    switch (type) {
      case "accept":
        socket?.emit(VIDEO_CALL_ACCEPTED, { caller });
        break;
      case "reject":
        socket?.emit(VIDEO_CALL_REJECTED, { caller });
        break;
    }
  };

  return {
    callStatus,
    caller,
    handleCall,
  };
};

export default useCallingModal;
