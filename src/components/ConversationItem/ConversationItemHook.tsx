import { useMemo } from "react";

import { ConversationItemProps } from ".";
import { useConversationStore } from "@/store";

const useConversationItem = (props: ConversationItemProps) => {
  const conversationIdsTyping = useConversationStore((state) => state.conversationIdsTyping);
  const conversation = useConversationStore((state) => state.conversation);

  const isReceiverTyping = () => conversation && conversationIdsTyping.get(conversation?.id);

  const controlOptions = useMemo(
    () => [
      { key: "1", label: <div>Block</div> },
      { key: "2", label: <div>Call video</div> },
      { key: "3", label: <div>Delete</div> },
    ],
    [],
  );

  return {
    isReceiverTyping,
    controlOptions,
  };
};

export default useConversationItem;
