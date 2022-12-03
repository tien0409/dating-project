import { useEffect } from "react";

import useConversationStore from "@/store/useConversationStore";

const useConversationList = () => {
  const requestConversations = useConversationStore((state) => state.requestConversations);
  const onResponseConversations = useConversationStore((state) => state.onResponseConversations);
  const conversations = useConversationStore((state) => state.conversations);
  console.log("conversations", conversations);

  useEffect(() => {
    requestConversations();
  }, [requestConversations]);

  useEffect(() => {
    onResponseConversations();
  }, [onResponseConversations]);

  return { conversations };
};

export default useConversationList;
