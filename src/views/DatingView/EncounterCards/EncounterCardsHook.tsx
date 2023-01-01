import { useCallback, useState } from "react";

import { useGetUsersExploreData } from "@/hooks/useUsersData";
import { AxiosResponseType, UserAuthType } from "@/types";

const useEncounterCards = () => {
  const [page, setPage] = useState(1);
  const [indexEncounter, setIndexEncounter] = useState(0);
  const [userExplores, setUserExplores] = useState<UserAuthType[]>([]);

  const handleSuccess = useCallback((res: AxiosResponseType<UserAuthType[]>) => {
    res?.data?.userExplores && setUserExplores(res?.data?.userExplores);
  }, []);

  const { data: res, isFetching } = useGetUsersExploreData(page, { onSuccess: handleSuccess });

  const handleNext = useCallback(() => {
    if (userExplores.length > indexEncounter + 1) setIndexEncounter(indexEncounter + 1);
    else if (res?.data && page < res?.data?.pagination?.totalPage) {
      setPage(page + 1);
      setIndexEncounter(0);
    } else if (userExplores.length === indexEncounter + 1) {
      setUserExplores([]);
    }
  }, [indexEncounter, page, res?.data, userExplores.length]);

  return { userExplores, indexEncounter, isFetching, handleNext };
};

export default useEncounterCards;
