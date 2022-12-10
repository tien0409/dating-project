import { useConversationStore } from "@/store";
import { useMemo } from "react";

const useRecentConversation = () => {
  const conversations = useConversationStore((state) => state.conversations);
  const loadingGetConversations = useConversationStore((state) => state.loadingGetConversations);

  const _conversationsInternal = useMemo(
    () => (loadingGetConversations ? Array(5).fill(0) : conversations.slice(0, 5)),
    [conversations, loadingGetConversations],
  );

  return { loadingGetConversations, _conversationsInternal };
};

export default useRecentConversation;
