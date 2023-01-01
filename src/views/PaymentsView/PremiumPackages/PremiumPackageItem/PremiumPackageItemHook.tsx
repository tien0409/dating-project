import { PremiumPackageItemProps } from ".";
import usePaymentStore from "@/store/usePaymentStore";

const usePremiumPackageItem = (props: PremiumPackageItemProps) => {
  const { premiumPackage } = props;

  const premiumPackageSelected = usePaymentStore((state) => state.premiumPackageSelected);
  const setPremiumPackageSelected = usePaymentStore((state) => state.setPremiumPackageSelected);

  const handleClick = () => {
    setPremiumPackageSelected(premiumPackage);
  };

  return { premiumPackageSelected, handleClick };
};

export default usePremiumPackageItem;
