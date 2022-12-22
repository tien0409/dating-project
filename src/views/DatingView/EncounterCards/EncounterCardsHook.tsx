import { useCallback, useMemo, useState } from "react";

import { useGetUsersExploreData } from "@/hooks/useUsersData";
import { UserAuthType } from "@/types";

const useEncounterCards = () => {
  const [page, setPage] = useState(1);
  const [indexEncounter, setIndexEncounter] = useState(0);

  const { data: res, isFetching } = useGetUsersExploreData(page);

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

  return { userExplores, indexEncounter, isFetching, handleSkip };
};

export default useEncounterCards;
