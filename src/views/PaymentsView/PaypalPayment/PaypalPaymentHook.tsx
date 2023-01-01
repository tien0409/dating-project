import { useEffect, useState } from "react";

import usePaymentStore from "@/store/usePaymentStore";
import { useCreateOrderData } from "@/hooks/usePaymentsData";
import { toast } from "react-toastify";

const usePaypalPayment = () => {
  const premiumPackageSelected = usePaymentStore((state) => state.premiumPackageSelected);

  const { mutateAsync } = useCreateOrderData();

  const [scriptLoaded, setScriptLoaded] = useState(false);

  const handleSuccess = async () => {
    try {
      await mutateAsync({ premiumPackageId: premiumPackageSelected?.id });
      toast.success("Payment success");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Payment failed");
    }
  };

  useEffect(() => {
    if ((window as any)?.paypal) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    // eslint-disable-next-line max-len
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AbbgJU3naQ4-WxVu81Ks2_sksULk5x4tLPlGJasGNBfhPP2OKwbJ1b_IUuo9DFqS2dTyYJJkLysuSocR";
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true);
    };
    document.body.append(script);
  }, []);

  return { scriptLoaded, premiumPackageSelected, handleSuccess };
};

export default usePaypalPayment;
