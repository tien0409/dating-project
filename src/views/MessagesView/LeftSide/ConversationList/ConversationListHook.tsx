import { useEffect } from "react";

import { useChatStore, useSocketStore } from "@/store";
import { SEND_ALL_CONVERSATIONS } from "@/configs/socket-events";

const useConversationList = () => {
  const socket = useSocketStore((state) => state.socket);
  const conversations = useChatStore((state) => state.conversations);
  const setConversations = useChatStore((state) => state.setConversations);

  useEffect(() => {
    socket.on(SEND_ALL_CONVERSATIONS, (conversations) => {
      setConversations(conversations);
    });

    return () => {
      socket.off(SEND_ALL_CONVERSATIONS);
    };
  }, [setConversations, socket]);

  return { conversations };
};

export default useConversationList;
