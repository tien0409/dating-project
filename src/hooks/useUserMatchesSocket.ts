import { useEffect } from "react";

import { useAuthStore, useSocketStore } from "@/store";
import { ON_CREATE_USER_LIKE, ON_USER_MATCHED } from "@/configs/socket-events";

const useUserMatchesSocket = () => {
  const socket = useSocketStore((state) => state.socket);
  const profile = useAuthStore((state) => state.profile);

  useEffect(() => {
    if (!socket || !profile) return;

    socket.on(ON_USER_MATCHED, (data: any) => {
      console.log("data", data);
    });

    socket.on(ON_CREATE_USER_LIKE, (data: any) => {
      console.log("data", data);
    });

    return () => {
      socket.off(ON_CREATE_USER_LIKE);
      socket.off(ON_USER_MATCHED);
    };
  }, [profile, socket]);
};

export default useUserMatchesSocket;
