import { useEffect, useMemo } from "react";

import { useConversationStore, useSocketStore } from "@/store";
import { SEND_ALL_CONVERSATIONS } from "@/configs/socket-events";

const useConversationList = () => {
  const socket = useSocketStore((state) => state.socket);
  const conversations = useConversationStore((state) => state.conversations);
  const setConversations = useConversationStore((state) => state.setConversations);
  const loadingGetConversations = useConversationStore((state) => state.loadingGetConversations);
  const setLoadingGetConversations = useConversationStore(
    (state) => state.setLoadingGetConversations,
  );

  const _conversationsInternal = useMemo(
    () => (loadingGetConversations ? Array(7).fill(0) : conversations),
    [conversations, loadingGetConversations],
  );

  useEffect(() => {
    socket.on(SEND_ALL_CONVERSATIONS, (conversations) => {
      setConversations(conversations);
      setLoadingGetConversations(false);
    });

    return () => {
      socket.off(SEND_ALL_CONVERSATIONS);
    };
  }, [setConversations, socket]);

  return { _conversationsInternal, loadingGetConversations };
};

export default useConversationList;
