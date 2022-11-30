import create from "zustand";
import UserAuthType from "@/types/auth/UserAuthType";

type Store = {
  profile: UserAuthType | null;
  setProfile: (profile: UserAuthType | null) => void;
};

const useStore = create<Store>((set) => ({
  profile: null,
  setProfile: (profile) => set((state) => ({ ...state, profile })),
}));

export default useStore;
