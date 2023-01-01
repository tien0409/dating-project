import create from "zustand";

import { PremiumPackageType } from "@/types";

type PaymentStoreType = {
  premiumPackages: PremiumPackageType[];
  setPremiumPackages: (_premiumPackages: PremiumPackageType[]) => void;
  premiumPackageSelected: PremiumPackageType | null;
  setPremiumPackageSelected: (_premiumPackageSelected: PremiumPackageType | null) => void;
};

const usePaymentStore = create<PaymentStoreType>((setState) => ({
  premiumPackages: [],
  setPremiumPackages: (premiumPackages) => setState((state) => ({ ...state, premiumPackages })),
  premiumPackageSelected: null,
  setPremiumPackageSelected: (premiumPackageSelected) =>
    setState((state) => ({ ...state, premiumPackageSelected })),
}));

export default usePaymentStore;
