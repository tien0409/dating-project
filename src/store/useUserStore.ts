import create from "zustand";

import { UserAuthType } from "@/types";

type UserStoreType = {
  users?: UserAuthType;
};

const useUserStore = create<UserStoreType>(() => ({
  users: undefined,
}));

export default useUserStore;