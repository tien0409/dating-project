import { useEffect, useMemo, useRef } from "react";

import { useMessageStore } from "@/store";

const useMessageList = () => {
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const messages = useMessageStore((state) => state.messages);
  const loadingGetMessages = useMessageStore((state) => state.loadingGetMessages);

  const _messagesInternal = useMemo(
    () => (loadingGetMessages ? Array(15).fill(0) : messages),
    [loadingGetMessages, messages],
  );

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return {
    loadingGetMessages,
    lastMessageRef,
    _messagesInternal,
  };
};

export default useMessageList;
