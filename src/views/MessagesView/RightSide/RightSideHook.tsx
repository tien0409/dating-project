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
import { VIDEO_CALL_HANG_UP } from "@/configs/socket-events";
import { ReqVideoCallInitType } from "@/types";

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
  const setLocalStream = useCallStore((state) => state.setLocalStream);
  const setReceiver = useCallStore((state) => state.setReceiver);
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

  const handleVideoCall = async () => {
    if (conversation?.id && receiverParticipant?.user?.id && profile) {
      const payload: ReqVideoCallInitType = {
        conversationId: conversation?.id,
        receiverId: receiverParticipant?.user?.id,
      };
      socket?.emit(VIDEO_CALL_HANG_UP, payload);

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      setCallStatus("calling");
      setCaller(profile);
      setReceiver(receiverParticipant?.user);
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
    handleVideoCall,
  };
};

export default useRightSide;
