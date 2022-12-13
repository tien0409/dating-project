import create from "zustand";
import UserAuthType from "@/types/auth/UserAuthType";

type AuthStoreType = {
  profile: UserAuthType | null;
  setProfile: (_profile: UserAuthType | null) => void;
};

const useAuthStore = create<AuthStoreType>((set) => ({
  profile: null,
  setProfile: (profile) => set((state) => ({ ...state, profile })),
}));

export default useAuthStore;
