import create from "zustand";
import { UserAuthType } from "@/types";

type UserMatchStoreType = {
  usersMatched: UserAuthType[];
  setUsersMatched: (_users: UserAuthType[]) => void;
  type: "idle" | "matched";
  setType: (_type: "idle" | "matched") => void;
};

const useUserMatchStore = create<UserMatchStoreType>((setState) => ({
  usersMatched: [],
  setUsersMatched: (usersMatched: UserAuthType[]) =>
    setState((state) => ({ ...state, usersMatched })),
  type: "idle",
  setType: (type: "idle" | "matched") => setState((state) => ({ ...state, type })),
}));

export default useUserMatchStore;
