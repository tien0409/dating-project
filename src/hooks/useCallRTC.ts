import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuthStore, useCallStore, useSocketStore } from "@/store";
import {
  ON_VIDEO_CALL,
  ON_VIDEO_CALL_ACCEPT,
  ON_VIDEO_CALL_REJECTED,
} from "@/configs/socket-events";
import { ResVideoCallAcceptType, ResVideoCallType } from "@/types";
import { MESSAGES_ROUTE } from "@/configs/routes";

const useCallRTC = () => {
  const router = useRouter();

  const initPeer = useCallStore((state) => state.initPeer);
  const profile = useAuthStore((state) => state.profile);
  const peer = useCallStore((state) => state.peer);
  const socket = useSocketStore((state) => state.socket);
  const callStatus = useCallStore((state) => state.callStatus);
  const call = useCallStore((state) => state.call);
  const setRemoteStream = useCallStore((state) => state.setRemoteStream);
  const setLocalStream = useCallStore((state) => state.setLocalStream);
  const setCall = useCallStore((state) => state.setCall);
  const setCallStatus = useCallStore((state) => state.setCallStatus);
  const setConnection = useCallStore((state) => state.setConnection);
  const setCaller = useCallStore((state) => state.setCaller);
  const setActiveConversationId = useCallStore((state) => state.setActiveConversationId);
  const resetCallState = useCallStore((state) => state.resetCallState);

  useEffect(() => {
    if (!socket) return;

    socket?.on(ON_VIDEO_CALL, (payload: ResVideoCallType) => {
      const { caller, conversationId } = payload;

      if (callStatus !== "idle") return;

      setCallStatus("receiving-call");
      setActiveConversationId(conversationId);
      setCaller(caller);

      router.push(MESSAGES_ROUTE + `/${conversationId}`);
    });

    socket?.on(ON_VIDEO_CALL_ACCEPT, (payload: ResVideoCallAcceptType) => {
      const { caller, acceptor } = payload;

      if (caller?.id === profile?.id) {
        const connection = peer.connect(acceptor.id);
        setConnection(connection);

        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: true,
          })
          .then((stream) => {
            const newCall = peer.call(acceptor.id, stream);
            setCall(newCall);
          });
      }
      setCallStatus("in-call");
    });

    socket?.on(ON_VIDEO_CALL_REJECTED, () => {
      resetCallState();
    });

    return () => {
      socket?.off(ON_VIDEO_CALL);
      socket?.off(ON_VIDEO_CALL_ACCEPT);
      socket?.off(ON_VIDEO_CALL_REJECTED);
    };
  }, [
    callStatus,
    peer,
    profile?.id,
    resetCallState,
    router,
    setActiveConversationId,
    setCall,
    setCallStatus,
    setCaller,
    setConnection,
    socket,
  ]);

  useEffect(() => {
    if (!peer) {
      profile?.id && initPeer();
      return;
    }

    peer.on("call", (incomingCall: any) => {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          incomingCall.answer(stream);
          setLocalStream(stream);
          setCall(incomingCall);
        });
    });

    return () => {
      peer?.off("call");
    };
  }, [initPeer, peer, profile?.id, setCall, setCallStatus, setLocalStream]);

  useEffect(() => {
    if (!call) return;

    call?.on("stream", (remoteStream) => {
      console.log("remoteStream", remoteStream);
      setRemoteStream(remoteStream);
    });
  }, [call, setRemoteStream]);

  // useEffect(() => {
  //   if (!connection) return;
  //
  //   connection?.on("open", () => {
  //     console.log("open");
  //   });
  //
  //   return () => {
  //     connection?.off("open");
  //   };
  // }, [connection]);
};

export default useCallRTC;
