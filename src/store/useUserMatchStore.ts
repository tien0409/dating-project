import create from "zustand";
import { UserMatchType } from "@/types";

type UserMatchStoreType = {
  usersMatched: UserMatchType[];
  setUsersMatched: (_users: UserMatchType[]) => void;
  type: "idle" | "matched";
  setType: (_type: "idle" | "matched") => void;
};

const useUserMatchStore = create<UserMatchStoreType>((setState) => ({
  usersMatched: [],
  setUsersMatched: (usersMatched: UserMatchType[]) =>
    setState((state) => ({ ...state, usersMatched })),
  type: "idle",
  setType: (type: "idle" | "matched") => setState((state) => ({ ...state, type })),
}));

export default useUserMatchStore;
