import { useConversationStore } from "@/store";

const useRecentConversation = () => {
  const conversations = useConversationStore((state) => state.conversations);
  const loadingGetConversations = useConversationStore((state) => state.loadingGetConversations);

  return { loadingGetConversations, conversations };
};

export default useRecentConversation;
