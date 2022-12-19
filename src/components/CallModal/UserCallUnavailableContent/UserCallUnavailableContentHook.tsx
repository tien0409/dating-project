import { useCallStore, useConversationStore, useSocketStore } from "@/store";
import { ReqCallInitType } from "@/types";
import { VIDEO_CALL_INIT } from "@/configs/socket-events";

const useUserCallUnavailable = () => {
  const socket = useSocketStore((state) => state.socket);
  const conversation = useConversationStore((state) => state.conversation);
  const receiver = useCallStore((state) => state.receiver);
  const callType = useCallStore((state) => state.callType);
  const setCallStatus = useCallStore((state) => state.setCallStatus);
  const resetCallState = useCallStore((state) => state.resetCallState);

  const handleCall = (type: string) => () => {
    switch (type) {
      case "re-call":
        if (receiver?.id && callType && conversation?.id) {
          const payload: ReqCallInitType = {
            receiverId: receiver?.id,
            conversationId: conversation?.id,
            callType,
          };

          setCallStatus("calling");

          socket?.emit(VIDEO_CALL_INIT, payload);
        }
        break;
      case "cancel":
        resetCallState();
        break;
    }
  };

  return {
    receiver,
    handleCall,
  };
};

export default useUserCallUnavailable;
