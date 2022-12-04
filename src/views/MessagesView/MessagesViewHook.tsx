import { useRouter } from "next/router";
import { useEffect } from "react";

import { useSocketStore } from "@/store";
import { REQUEST_ALL_CONVERSATIONS, REQUEST_ALL_MESSAGES } from "@/configs/socket-events";

const useMessageView = () => {
  const router = useRouter();

  const socket = useSocketStore((state) => state.socket);

  useEffect(() => {
    if (router.query.conversationId?.[0]) {
      socket.emit(REQUEST_ALL_MESSAGES, { id: router.query.conversationId?.[0] });
    }
  }, [router.query.conversationId, socket]);

  useEffect(() => {
    socket.emit(REQUEST_ALL_CONVERSATIONS);
  }, [socket]);
};

export default useMessageView;
