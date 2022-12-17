import { useMemo, useState } from "react";

import { useGetUsersExploreData } from "@/hooks/useUsersData";
import { UserAuthType } from "@/types";

const useDatingView = () => {
  const { data: res } = useGetUsersExploreData();

  const usersExplore = useMemo<UserAuthType[]>(() => res?.data || [], [res?.data]);
  const [indexEncounter, setIndexEncounter] = useState(0);

  const handleSkip = () => {
    if (usersExplore.length >= indexEncounter + 1) setIndexEncounter(indexEncounter + 1);
  };

  return { usersExplore, indexEncounter, handleSkip };
};

export default useDatingView;
