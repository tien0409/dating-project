import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { useGetUsersExploreData } from "@/hooks/useUsersData";
import { CreateMatchType, UserAuthType } from "@/types";
import { useAuthStore } from "@/store";
import { LIKE_ENUM } from "@/configs/consts";
import { useCreateMatchData } from "@/hooks/userUserMatchesData";

const useEncounterCards = () => {
  const profile = useAuthStore((state) => state.profile);

  const [page, setPage] = useState(1);
  const [indexEncounter, setIndexEncounter] = useState(0);

  const { data: res, isFetching } = useGetUsersExploreData(page);
  const { mutateAsync } = useCreateMatchData();

  const userExplores = useMemo<UserAuthType[]>(() => res?.data?.userExplores || [], [
    res?.data?.userExplores,
  ]);

  const handleSkip = useCallback(async () => {
    if (userExplores.length > indexEncounter + 1) setIndexEncounter(indexEncounter + 1);
    else if (res?.data && page < res?.data?.pagination?.totalPage) {
      setPage(page + 1);
      setIndexEncounter(0);
    }
  }, [indexEncounter, page, res?.data, userExplores.length]);

  const handleLike = useCallback(async () => {
    try {
      const payload: CreateMatchType = {
        userId: profile?.id,
        userMatchId: userExplores[indexEncounter]?.id,
        type: LIKE_ENUM,
      };
      await mutateAsync(payload);
      await handleSkip();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  }, [handleSkip, indexEncounter, mutateAsync, profile?.id, userExplores]);

  return { userExplores, indexEncounter, isFetching, handleSkip, handleLike };
};

export default useEncounterCards;
