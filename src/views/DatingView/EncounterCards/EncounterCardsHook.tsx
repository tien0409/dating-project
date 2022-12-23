import { useCallback, useMemo, useState } from "react";

import { useGetUsersExploreData } from "@/hooks/useUsersData";
import { UserAuthType } from "@/types";
import { useAuthStore } from "@/store";
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

  const handleNext = useCallback(() => {
    if (userExplores.length > indexEncounter + 1) setIndexEncounter(indexEncounter + 1);
    else if (res?.data && page < res?.data?.pagination?.totalPage) {
      setPage(page + 1);
      setIndexEncounter(0);
    }
  }, [indexEncounter, page, res?.data, userExplores.length]);

  return { userExplores, indexEncounter, isFetching, handleNext };
};

export default useEncounterCards;
