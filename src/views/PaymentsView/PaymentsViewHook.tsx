import { toast } from "react-toastify";
import { useCallback, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { useCreateChargeData } from "@/hooks/usePaymentsData";
import usePaymentStore from "@/store/usePaymentStore";

const usePaymentsView = () => {
  const stripe = useStripe();
  const elements = useElements();

  const premiumPackageSelected = usePaymentStore((state) => state.premiumPackageSelected);

  const { mutateAsync } = useCreateChargeData();

  const [segmentSelected, setSegmentSelected] = useState<"credit-card" | "paypal">("credit-card");
  const [loading, setLoading] = useState(false);

  const handleChangeSegment = (value: any) => {
    setSegmentSelected(value);
  };

  const handlePaymentWithCreditCard = useCallback(async () => {
    try {
      setLoading(true);
      if (!premiumPackageSelected) {
        toast.error("Please select a premium package");
        return;
      }

      const cardElement = elements?.getElement(CardElement);
      if (!stripe || !cardElement || !elements) return;

      const stripeResponse = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
      const { error, paymentMethod } = stripeResponse;
      if (error || !paymentMethod) {
        toast.error(error?.message || "Payment failed");
        return;
      }

      const paymentMethodId = paymentMethod.id;

      await mutateAsync({
        paymentMethodId,
        amount: premiumPackageSelected.price,
        premiumPackageId: premiumPackageSelected?.id,
      });
      toast.success("Payment success");
    } catch (error: any) {
      toast.error(error?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  }, [elements, mutateAsync, premiumPackageSelected, stripe]);

  return {
    segmentSelected,
    loading,
    handleChangeSegment,
    handlePaymentWithCreditCard,
  };
};

export default usePaymentsView;
