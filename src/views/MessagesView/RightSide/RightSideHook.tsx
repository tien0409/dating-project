import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import { useCallStore, useMessageStore, useParticipantStore } from "@/store";

const useRightSide = () => {
  const router = useRouter();

  const receiverParticipant = useParticipantStore((state) => state.receiverParticipant);
  const messageReply = useMessageStore((state) => state.messageReply);
  const messageEdit = useMessageStore((state) => state.messageEdit);
  const peer = useCallStore((state) => state.peer);
  const connection = useCallStore((state) => state.connection);
  const call = useCallStore((state) => state.call);
  const callStatus = useCallStore((state) => state.callStatus);
  const setConnection = useCallStore((state) => state.setConnection);
  const setCall = useCallStore((state) => state.setCall);
  const setMessageEdit = useMessageStore((state) => state.setMessageEdit);
  const setMessageReply = useMessageStore((state) => state.setMessageReply);

  const messageAction = useMemo(() => messageReply || messageEdit, [messageEdit, messageReply]);

  const isCalling = callStatus === "calling";

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

  const handleVideoCall = async () => {
    const peerConnection = peer?.connect(receiverParticipant?.user?.id);
    setConnection(peerConnection);
    // setCallStatus("calling");

    const mediaScreen = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    const newCall = peer.call(receiverParticipant?.user?.id, mediaScreen);
    setCall(newCall);
  };

  useEffect(() => {
    if (connection) {
      connection?.on("open", () => {
        console.log("open");
      });
    }

    return () => {
      connection?.off("open");
    };
  }, [connection]);

  useEffect(() => {
    if (call) {
      call?.on("stream", (remoteStream) => {
        console.log("remoteStream", remoteStream);
      });
    }

    return () => {
      call?.off("stream");
    };
  }, [call]);

  return {
    router,
    receiverParticipant,
    messageAction,
    messageReply,
    isCalling,
    handleRemoveAction,
    handleScrollToMessage,
    handleVideoCall,
  };
};

export default useRightSide;
