import { useCallback, useEffect } from "react";

import { useAuthStore, useConversationStore, useSocketStore, useUserMatchStore } from "@/store";
import {
  ON_CREATE_USER_LIKE,
  ON_RESET_USER_MATCHES,
  ON_USER_MATCHED,
} from "@/configs/socket-events";
import { AxiosResponseType, ResUserMatchedType, UserMatchType } from "@/types";
import { toast } from "react-toastify";
import { useUserMatchesData } from "@/hooks/useUserMatchesData";

const useUserMatchesSocket = () => {
  const socket = useSocketStore((state) => state.socket);
  const profile = useAuthStore((state) => state.profile);
  const resetUserMatches = useUserMatchStore((state) => state.resetUserMatches);
  const userCurrentMatches = useUserMatchStore((state) => state.userCurrentMatches);
  const conversations = useConversationStore((state) => state.conversations);
  const setUserCurrentMatches = useUserMatchStore((state) => state.setUserCurrentMatches);
  const setResetUserMatches = useUserMatchStore((state) => state.setResetUserMatches);
  const setUserMatches = useUserMatchStore((state) => state.setUserMatches);
  const setConversations = useConversationStore((state) => state.setConversations);

  const handleSuccess = useCallback(
    (res: AxiosResponseType<UserMatchType>) => {
      setUserMatches(res?.data);
      setResetUserMatches(false);
    },
    [setResetUserMatches, setUserMatches],
  );

  useUserMatchesData({ onSuccess: handleSuccess, enabled: resetUserMatches });

  useEffect(() => {
    if (!socket || !profile) return;

    socket.on(ON_USER_MATCHED, (payload: ResUserMatchedType) => {
      const { conversation } = payload;

      setUserCurrentMatches([...userCurrentMatches, payload]);
      setConversations([conversation, ...conversations]);
    });

    socket.on(ON_CREATE_USER_LIKE, () => {
      toast.success("Have a new user like you. Check it out now", {
        icon: "🥰",
      });
    });

    socket.on(ON_RESET_USER_MATCHES, () => {
      setResetUserMatches(true);
    });

    return () => {
      socket.off(ON_CREATE_USER_LIKE);
      socket.off(ON_USER_MATCHED);
      socket.off(ON_RESET_USER_MATCHES);
    };
  }, [
    conversations,
    profile,
    setConversations,
    setResetUserMatches,
    setUserCurrentMatches,
    socket,
    userCurrentMatches,
  ]);
};

export default useUserMatchesSocket;
