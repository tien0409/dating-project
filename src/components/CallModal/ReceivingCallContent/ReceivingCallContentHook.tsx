import { HandleCallType } from "@/types";
import { VIDEO_CALL_ACCEPTED, CALL_REJECTED } from "@/configs/socket-events";
import { useCallStore, useSocketStore } from "@/store";

const useReceivingCallContent = () => {
  const socket = useSocketStore((state) => state.socket);
  const caller = useCallStore((state) => state.caller);
  const callType = useCallStore((state) => state.callType);
  const resetCallState = useCallStore((state) => state.resetCallState);

  const handleCall = (type: HandleCallType) => () => {
    switch (type) {
      case "accept":
        socket?.emit(VIDEO_CALL_ACCEPTED, { caller });
        break;
      case "reject":
        socket?.emit(CALL_REJECTED, { caller });
        resetCallState();
        break;
    }
  };

  return {
    caller,
    callType,
    handleCall,
  };
};

export default useReceivingCallContent;
