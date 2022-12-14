import { useRouter } from "next/router";
import { useMemo } from "react";

import { useMessageStore, useParticipantStore } from "@/store";

const useRightSide = () => {
  const router = useRouter();

  const receiverParticipant = useParticipantStore((state) => state.receiverParticipant);
  const messageReply = useMessageStore((state) => state.messageReply);
  const messageEdit = useMessageStore((state) => state.messageEdit);
  const isCalling = useMessageStore((state) => state.isCalling);
  const setMessageReply = useMessageStore((state) => state.setMessageReply);
  const setMessageEdit = useMessageStore((state) => state.setMessageEdit);

  const messageAction = useMemo(() => messageReply || messageEdit, [messageEdit, messageReply]);

  const handleRemoveAction = () => {
    messageReply ? setMessageReply(undefined) : setMessageEdit(undefined);
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
    messageAction,
    messageReply,
    isCalling,
    handleRemoveAction,
    handleScrollToMessage,
  };
};

export default useRightSide;
