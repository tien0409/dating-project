import { useMemo } from "react";

import { useConversationStore, useMessageStore, useParticipantStore } from "@/store";

const useMessageList = () => {
  const lastMessageEl = useMessageStore((state) => state.lastMessageEl);
  const messages = useMessageStore((state) => state.messages);
  const conversationIdsTyping = useConversationStore((state) => state.conversationIdsTyping);
  const conversation = useConversationStore((state) => state.conversation);
  const loadingGetMessages = useMessageStore((state) => state.loadingGetMessages);
  const participantTyping = useParticipantStore((state) => state.participantTyping);
  const receiverParticipant = useParticipantStore((state) => state.receiverParticipant);

  const _messagesInternal = useMemo(() => (loadingGetMessages ? Array(15).fill(0) : messages), [
    loadingGetMessages,
    messages,
  ]);

  const isReceiverTyping = () => {
    return (
      participantTyping &&
      !!receiverParticipant &&
      conversation &&
      conversationIdsTyping.get(conversation?.id)
    );
  };

  // useEffect(() => {
  //   lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);
  //
  return {
    isReceiverTyping,
    receiverParticipant,
    loadingGetMessages,
    lastMessageEl,
    _messagesInternal,
  };
};

export default useMessageList;
