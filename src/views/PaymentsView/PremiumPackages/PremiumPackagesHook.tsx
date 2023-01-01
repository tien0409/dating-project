import { useEffect } from "react";

import { usePremiumPackagesData } from "@/hooks/usePremiumPackagesData";
import usePaymentStore from "@/store/usePaymentStore";

const usePremiumPackages = () => {
  const premiumPackages = usePaymentStore((state) => state.premiumPackages);
  const setPremiumPackages = usePaymentStore((state) => state.setPremiumPackages);

  const { data: res } = usePremiumPackagesData();

  useEffect(() => {
    if (res?.data) {
      setPremiumPackages(res.data);
    }
  }, [res?.data, setPremiumPackages]);

  return { premiumPackages };
};

export default usePremiumPackages;
