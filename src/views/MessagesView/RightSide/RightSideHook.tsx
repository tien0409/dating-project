import { useRouter } from "next/router";
import { useMemo } from "react";

import {
  useAuthStore,
  useCallStore,
  useConversationStore,
  useMessageStore,
  useParticipantStore,
  useSocketStore,
} from "@/store";
import { VIDEO_CALL_INIT, VOICE_CALL_INIT } from "@/configs/socket-events";
import { CallType, ReqCallInitType } from "@/types";

const useRightSide = () => {
  const router = useRouter();

  const messageReply = useMessageStore((state) => state.messageReply);
  const messageEdit = useMessageStore((state) => state.messageEdit);
  const receiverParticipant = useParticipantStore((state) => state.receiverParticipant);
  const conversation = useConversationStore((state) => state.conversation);
  const profile = useAuthStore((state) => state.profile);
  const socket = useSocketStore((state) => state.socket);
  const callStatus = useCallStore((state) => state.callStatus);
  const setCallStatus = useCallStore((state) => state.setCallStatus);
  const setCaller = useCallStore((state) => state.setCaller);
  const setReceiver = useCallStore((state) => state.setReceiver);
  const setCallType = useCallStore((state) => state.setCallType);
  const setEnableCamera = useCallStore((state) => state.setEnableCamera);
  const setActiveConversationId = useCallStore((state) => state.setActiveConversationId);
  const setMessageEdit = useMessageStore((state) => state.setMessageEdit);
  const setMessageReply = useMessageStore((state) => state.setMessageReply);

  const messageAction = useMemo(() => messageReply || messageEdit, [messageEdit, messageReply]);

  const isInCall = callStatus === "in-call";

  const handleRemoveAction = () => {
    messageReply ? setMessageReply(undefined) : setMessageEdit(undefined);
  };

  const handleScrollToMessage = () => {
    if (messageReply) {
      const messageReplied = document.getElementById(messageReply?.id);

      messageReplied?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleCall = (type: CallType) => () => {
    if (receiverParticipant?.user?.id && profile && conversation?.id) {
      const payload: ReqCallInitType = {
        receiverId: receiverParticipant?.user?.id,
        conversationId: conversation?.id,
        callType: type,
      };

      if (type === "video-call") {
        setCallType("video-call");
        setEnableCamera(true);
        socket?.emit(VIDEO_CALL_INIT, payload);
      } else {
        setCallType("audio-call");
        setEnableCamera(false);
        socket?.emit(VOICE_CALL_INIT, payload);
      }

      setCallStatus("calling");
      setCaller(profile);
      setReceiver(receiverParticipant?.user);
      setActiveConversationId(conversation?.id);
    }
  };

  return {
    router,
    receiverParticipant,
    messageAction,
    messageReply,
    isInCall,
    handleRemoveAction,
    handleScrollToMessage,
    handleCall,
  };
};

export default useRightSide;
