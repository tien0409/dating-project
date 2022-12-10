import { useRouter } from "next/router";

import { useConversationStore } from "@/store";

const useConversationList = () => {
  const router = useRouter();

  const conversations = useConversationStore((state) => state.conversations);
  const conversation = useConversationStore((state) => state.conversation);
  const loadingGetConversations = useConversationStore((state) => state.loadingGetConversations);

  const isConversationActive = conversation?.id === router.query.conversationId?.[0];

  return { isConversationActive, conversations, loadingGetConversations };
};

export default useConversationList;
