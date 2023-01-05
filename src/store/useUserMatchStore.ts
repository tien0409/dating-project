import create from "zustand";

import { UserMatchType, UserCurrentMatchType } from "@/types";

type UserMatchStoreType = {
  resetUserMatches: boolean;
  setResetUserMatches: (_resetUserMatches: boolean) => void;
  loadingGetUserMatches: boolean;
  setLoadingGetUserMatches: (_loadingGetUserMatches: boolean) => void;
  userCurrentMatches: UserCurrentMatchType[];
  setUserCurrentMatches: (_userCurrentMatches: UserCurrentMatchType[]) => void;
  userMatches: UserMatchType[];
  setUserMatches: (_userMatches: UserMatchType[]) => void;
};

const useUserMatchStore = create<UserMatchStoreType>((setState) => ({
  resetUserMatches: true,
  setResetUserMatches: (resetUserMatches) => setState((state) => ({ ...state, resetUserMatches })),
  loadingGetUserMatches: false,
  setLoadingGetUserMatches: (loadingGetUserMatches) =>
    setState((state) => ({ ...state, loadingGetUserMatches })),
  userMatches: [],
  setUserMatches: (userMatches) => setState((state) => ({ ...state, userMatches })),
  userCurrentMatches: [],
  setUserCurrentMatches: (userCurrentMatches) =>
    setState((state) => ({ ...state, userCurrentMatches })),
}));

export default useUserMatchStore;
