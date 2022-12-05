import { useRouter } from "next/router";

import { useChatStore } from "@/store";

const useRightSide = () => {
  const router = useRouter();

  const receiverParticipant = useChatStore((state) => state.receiverParticipant);
  const messageReply = useChatStore((state) => state.messageReply);
  const setMessageReply = useChatStore((state) => state.setMessageReply);

  const handleRemoveMessageReply = () => {
    setMessageReply(undefined);
  };

  const handleScrollToMessage = () => {
    // const originalPath = router.asPath.split("#")[0];
    // const url = originalPath + `#${messageReply?.id}`;
    // router.replace(url, undefined, {scroll: true});
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