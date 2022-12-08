import { useRouter } from "next/router";
import { ForwardedRef } from "react";

import { useMessageStore, useParticipantStore } from "@/store";

const useRightSide = () => {
  const router = useRouter();

  const receiverParticipant = useParticipantStore((state) => state.receiverParticipant);
  const messageReply = useMessageStore((state) => state.messageReply);
  const setMessageReply = useMessageStore((state) => state.setMessageReply);

  const handleRemoveMessageReply = () => {
    setMessageReply(undefined);
  };

  const handleScrollToMessage = () => {
    if (messageReply) {
      const messageRepied = document.getElementById(messageReply?.id);

      messageRepied?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return {
    router,
    receiverParticipant,
    messageReply,
    handleRemoveMessageReply,
    handleScrollToMessage,
  };
};

export default useRightSide;
