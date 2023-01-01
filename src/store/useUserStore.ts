import create from "zustand";

import { UserType } from "@/types";

type UserStoreType = {
  users?: UserType;
};

const useUserStore = create<UserStoreType>(() => ({
  users: undefined,
}));

export default useUserStore;
