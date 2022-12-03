import create from "zustand";
import UserAuthType from "@/types/auth/UserAuthType";

type UserStoreType = {
  profile: UserAuthType | null;
  setProfile: (_profile: UserAuthType | null) => void;
};

const userStore = create<UserStoreType>((set) => ({
  profile: null,
  setProfile: (profile) => set((state) => ({ ...state, profile })),
}));

export default userStore;
