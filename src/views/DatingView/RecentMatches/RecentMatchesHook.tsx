import { useUserMatchStore } from "@/store";

const useRecentMatches = () => {
  const loadingGetUserMatches = useUserMatchStore((state) => state.loadingGetUserMatches);
  const userMatches = useUserMatchStore((state) => state.userMatches);
  const setUserMatches = useUserMatchStore((state) => state.setUserMatches);

  return { loadingGetUserMatches, userMatches };
};

export default useRecentMatches;
