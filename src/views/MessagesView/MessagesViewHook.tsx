import { useRouter } from "next/router";
import { useEffect } from "react";

import { useChatStore, useSocketStore } from "@/store";
import { REQUEST_ALL_CONVERSATIONS, REQUEST_ALL_MESSAGES } from "@/configs/socket-events";

const useMessageView = () => {
  const router = useRouter();

  const socket = useSocketStore((state) => state.socket);
  const setLoadingGetMessages = useChatStore((state) => state.setLoadingGetMessages);
  const setLoadingGetConversations = useChatStore((state) => state.setLoadingGetConversations);

  useEffect(() => {
    if (router.query.conversationId?.[0]) {
      socket.emit(REQUEST_ALL_MESSAGES, { id: router.query.conversationId?.[0] });
      setLoadingGetMessages(true);
    }
  }, [router.query.conversationId, setLoadingGetMessages, socket]);

  useEffect(() => {
    socket.emit(REQUEST_ALL_CONVERSATIONS);
    setLoadingGetConversations(true);
  }, [setLoadingGetConversations, socket]);
};

export default useMessageView;
