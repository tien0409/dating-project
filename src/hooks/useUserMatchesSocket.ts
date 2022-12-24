import { useEffect } from "react";

import { useAuthStore, useSocketStore, useUserMatchStore } from "@/store";
import { ON_CREATE_USER_LIKE, ON_USER_MATCHED } from "@/configs/socket-events";
import { ResUserMatchedType } from "@/types";

const useUserMatchesSocket = () => {
  const socket = useSocketStore((state) => state.socket);
  const profile = useAuthStore((state) => state.profile);
  const usersMatched = useUserMatchStore((state) => state.usersMatched);
  const setUsersMatched = useUserMatchStore((state) => state.setUsersMatched);

  useEffect(() => {
    if (!socket || !profile) return;

    socket.on(ON_USER_MATCHED, (payload: ResUserMatchedType) => {
      setUsersMatched([...usersMatched, payload]);
    });

    socket.on(ON_CREATE_USER_LIKE, (data: any) => {
      console.log("data", data);
    });

    return () => {
      socket.off(ON_CREATE_USER_LIKE);
      socket.off(ON_USER_MATCHED);
    };
  }, [profile, setUsersMatched, socket, usersMatched]);
};

export default useUserMatchesSocket;
