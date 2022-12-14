import { useRouter } from "next/router";
import { useEffect } from "react";

import {
  useConversationStore,
  useMessageStore,
  useSocketStore,
  useAuthStore,
  useCallStore,
} from "@/store";
import { REQUEST_ALL_MESSAGES } from "@/configs/socket-events";
import { ReqAllMessageType } from "@/types";

const useMessageView = () => {
  const router = useRouter();

  const profile = useAuthStore((state) => state.profile);
  const conversation = useConversationStore((state) => state.conversation);
  const socket = useSocketStore((state) => state.socket);
  const peer = useCallStore((state) => state.peer);
  const setCallStatus = useCallStore((state) => state.setCallStatus);
  const setLoadingGetMessages = useMessageStore((state) => state.setLoadingGetMessages);

  useEffect(() => {
    const currentConversationId = router.query.conversationId?.[0];
    if (profile?.id && currentConversationId && currentConversationId !== conversation?.id) {
      const payload: ReqAllMessageType = {
        conversationId: currentConversationId,
      };
      socket?.emit(REQUEST_ALL_MESSAGES, payload);
      setLoadingGetMessages(true);
    }
  }, [conversation, profile?.id, router.query.conversationId, setLoadingGetMessages, socket]);

  useEffect(() => {
    if (!peer) return;

    peer.on("call", (mediaConnection) => {
      setCallStatus("receivingCall");
    });
  }, [peer, setCallStatus]);
};

export default useMessageView;
