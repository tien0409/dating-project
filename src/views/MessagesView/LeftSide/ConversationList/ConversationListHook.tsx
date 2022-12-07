import { useMemo } from "react";

import { useConversationStore } from "@/store";

const useConversationList = () => {
  const conversations = useConversationStore((state) => state.conversations);
  const loadingGetConversations = useConversationStore((state) => state.loadingGetConversations);

  const _conversationsInternal = useMemo(
    () => (loadingGetConversations ? Array(7).fill(0) : conversations),
    [conversations, loadingGetConversations],
  );

  return { _conversationsInternal, loadingGetConversations };
};

export default useConversationList;
