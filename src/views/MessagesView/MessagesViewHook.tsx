import { useRouter } from "next/router";
import { useEffect } from "react";

import { useConversationStore, useMessageStore, useSocketStore, useUserStore } from "@/store";
import { REQUEST_ALL_MESSAGES } from "@/configs/socket-events";
import { ReqAllMessageType } from "@/types";

const useMessageView = () => {
  const router = useRouter();

  const profile = useUserStore((state) => state.profile);
  const conversation = useConversationStore((state) => state.conversation);
  const socket = useSocketStore((state) => state.socket);
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
};

export default useMessageView;
