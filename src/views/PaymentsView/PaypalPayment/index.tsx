import { PayPalButton } from "react-paypal-button-v2";

import usePaypalPayment from "./PaypalPaymentHook";

const PaypalPayment = () => {
  const { scriptLoaded, premiumPackageSelected, handleSuccess } = usePaypalPayment();

  return (
    <>
      {scriptLoaded && (
        <PayPalButton amount={premiumPackageSelected?.price || 0} onSuccess={handleSuccess} />
      )}
    </>
  );
};

export default PaypalPayment;
