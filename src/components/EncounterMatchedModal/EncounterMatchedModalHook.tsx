import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { MESSAGES_ROUTE } from "@/configs/routes";
import { useAuthStore, useUserMatchStore } from "@/store";

const useEncounterMatchedModal = () => {
  const router = useRouter();

  const profile = useAuthStore((state) => state.profile);
  const usersMatched = useUserMatchStore((state) => state.usersMatched);
  const setUsersMatched = useUserMatchStore((state) => state.setUsersMatched);

  const [visible, setVisible] = useState(false);

  const userCurrentMatched = useMemo(() => usersMatched[0], [usersMatched]);

  const handleBackToSwipe = () => {
    const newUsersMatched = usersMatched.slice(1);
    setUsersMatched(newUsersMatched);
    setVisible(false);
  };

  const handleGoToChat = async () => {
    await router.push({
      pathname: MESSAGES_ROUTE,
      query: { id: userCurrentMatched?.conversation?.id },
    });
    handleBackToSwipe();
  };

  useEffect(() => {
    const timerDisplay = setTimeout(() => {
      setVisible(usersMatched.length > 0);
    }, 700);

    return () => {
      clearTimeout(timerDisplay);
    };
  }, [usersMatched.length]);

  return {
    visible,
    profile,
    userCurrentMatched,
    handleGoToChat,
    handleBackToSwipe,
  };
};

export default useEncounterMatchedModal;
