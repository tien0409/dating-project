import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { MESSAGES_ROUTE } from "@/configs/routes";
import { useAuthStore, useUserMatchStore } from "@/store";

const useEncounterMatchedModal = () => {
  const router = useRouter();

  const profile = useAuthStore((state) => state.profile);
  const userCurrentMatches = useUserMatchStore((state) => state.userCurrentMatches);
  const setUserCurrentMatches = useUserMatchStore((state) => state.setUserCurrentMatches);

  const [visible, setVisible] = useState(false);

  const userCurrentMatched = useMemo(() => userCurrentMatches[0], [userCurrentMatches]);

  const handleBackToSwipe = () => {
    const newUsersMatched = userCurrentMatches.slice(1);
    setUserCurrentMatches(newUsersMatched);
    setVisible(false);
  };

  const handleGoToChat = async () => {
    await router.push({
      pathname: MESSAGES_ROUTE + "/" + userCurrentMatched?.userMatched?.id,
    });
    handleBackToSwipe();
  };

  useEffect(() => {
    const timerDisplay = setTimeout(() => {
      setVisible(userCurrentMatches.length > 0);
    }, 700);

    return () => {
      clearTimeout(timerDisplay);
    };
  }, [userCurrentMatches.length]);

  return {
    visible,
    profile,
    userCurrentMatched,
    handleGoToChat,
    handleBackToSwipe,
  };
};

export default useEncounterMatchedModal;
