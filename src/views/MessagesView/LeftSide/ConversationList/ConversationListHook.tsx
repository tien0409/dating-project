import { useRouter } from "next/router";
import { useCallback } from "react";

import { useConversationStore } from "@/store";
import { ConversationType } from "@/types";

const useConversationList = () => {
  const router = useRouter();

  const conversations = useConversationStore((state) => state.conversations);
  const conversation = useConversationStore((state) => state.conversation);
  const loadingGetConversations = useConversationStore((state) => state.loadingGetConversations);

  const isConversationActive = useCallback(
    (_conversation: ConversationType) =>
      _conversation && _conversation?.id === router.query.conversationId?.[0],
    [router.query.conversationId],
  );

  return { isConversationActive, conversations, loadingGetConversations };
};

export default useConversationList;
