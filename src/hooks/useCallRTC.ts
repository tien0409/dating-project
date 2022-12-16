import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuthStore, useCallStore, useSocketStore } from "@/store";
import {
  ON_VIDEO_CALL,
  ON_VIDEO_CALL_ACCEPT,
  ON_VIDEO_CALL_HANG_UP,
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
  const localStream = useCallStore((state) => state.localStream);
  const setRemoteStream = useCallStore((state) => state.setRemoteStream);
  const setLocalStream = useCallStore((state) => state.setLocalStream);
  const setCall = useCallStore((state) => state.setCall);
  const setCallStatus = useCallStore((state) => state.setCallStatus);
  const setConnection = useCallStore((state) => state.setConnection);
  const setCaller = useCallStore((state) => state.setCaller);
  const setReceiver = useCallStore((state) => state.setReceiver);
  const setActiveConversationId = useCallStore((state) => state.setActiveConversationId);
  const resetCallState = useCallStore((state) => state.resetCallState);

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
    if (!socket) return;

    socket?.on(ON_VIDEO_CALL, (payload: ResVideoCallType) => {
      const { caller, conversationId } = payload;

      if (callStatus !== "idle") return;

      setCallStatus("receiving-call");
      setActiveConversationId(conversationId);
      profile && setReceiver(profile);
      setCaller(caller);

      router.push(MESSAGES_ROUTE + `/${conversationId}`);
    });

    socket?.on(ON_VIDEO_CALL_ACCEPT, (payload: ResVideoCallAcceptType) => {
      const { caller, acceptor } = payload;

      if (caller?.id === profile?.id) {
        const connection = peer.connect(acceptor.id);
        setConnection(connection);
        if (localStream) {
          const newCall = peer?.call(acceptor.id, localStream);
          setCall(newCall);
        }
      }
      setCallStatus("in-call");
    });

    socket?.on(ON_VIDEO_CALL_REJECTED, () => {
      resetCallState();
    });

    socket?.on(ON_VIDEO_CALL_HANG_UP, () => {
      if (call) {
        call.close();
      }
      resetCallState();
    });

    return () => {
      socket?.off(ON_VIDEO_CALL);
      socket?.off(ON_VIDEO_CALL_ACCEPT);
      socket?.off(ON_VIDEO_CALL_REJECTED);
      socket?.off(ON_VIDEO_CALL_HANG_UP);
    };
  }, [
    call,
    callStatus,
    localStream,
    peer,
    profile,
    profile?.id,
    resetCallState,
    router,
    setActiveConversationId,
    setCall,
    setCallStatus,
    setCaller,
    setConnection,
    setReceiver,
    socket,
  ]);

  useEffect(() => {
    if (!call) return;

    call?.on("stream", (remoteStream) => {
      setRemoteStream(remoteStream);
    });

    call?.on("close", () => {
      console.log("call close");
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
