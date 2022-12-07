import { useEffect, useMemo, useRef } from "react";

import { useMessageStore, useParticipantStore } from "@/store";

const useMessageList = () => {
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const messages = useMessageStore((state) => state.messages);
  const loadingGetMessages = useMessageStore((state) => state.loadingGetMessages);
  const participantTyping = useParticipantStore((state) => state.participantTyping);
  const receiverParticipant = useParticipantStore((state) => state.receiverParticipant);

  const _messagesInternal = useMemo(
    () => (loadingGetMessages ? Array(15).fill(0) : messages),
    [loadingGetMessages, messages],
  );

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return {
    receiverParticipant,
    participantTyping,
    loadingGetMessages,
    lastMessageRef,
    _messagesInternal,
  };
};

export default useMessageList;
