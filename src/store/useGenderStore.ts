import create from "zustand";

import { GenderType } from "@/types";

type GenderStoreType = {
  gendersNormal: GenderType[];
  gendersSpecial: GenderType[];
  setGenders: (_genders: GenderType[]) => void;
};

const useGenderStore = create<GenderStoreType>((setState) => ({
  gendersNormal: [],
  gendersSpecial: [],
  setGenders: (genders) =>
    setState((state) => ({
      ...state,
      gendersNormal: genders?.slice(0, 2) || [],
      gendersSpecial: genders?.slice(2) || [],
    })),
}));

export default useGenderStore;
