import classNames from "classnames/bind";
import { useMemo } from "react";
import { AiFillCreditCard } from "react-icons/ai";
import { FaPaypal } from "react-icons/fa";
import { Case, Switch } from "react-if";
import { Segmented } from "antd";

import styles from "./PaymentsView.module.scss";
import usePaymentsView from "./PaymentsViewHook";
import CreditCardPayment from "./CreditCardPayment";
import PremiumPackages from "./PremiumPackages";
import PaypalPayment from "./PaypalPayment";

const cln = classNames.bind(styles);

const PaymentsView = () => {
  const { segmentSelected, handleChangeSegment } = usePaymentsView();

  const segments = useMemo<any>(
    () => [
      {
        label: (
          <div className={cln("segment__item")}>
            <AiFillCreditCard />
            <span>Credit card</span>
          </div>
        ),
        value: "credit-card",
      },
      {
        label: (
          <div className={cln("segment__item")}>
            <FaPaypal />
            <span>Paypal</span>
          </div>
        ),
        value: "paypal",
      },
    ],
    [],
  );

  // const stripe = useStripe();
  // const elements = useElements();

  // const { mutate } = useCreateChargeData();

  // const handleSubmit = useCallback(
  //   async (e: any) => {
  //     e.preventDefault();
  //     const amountToCharge = 100;
  //     const cardElement = elements?.getElement(CardElement);
  //     if (!stripe || !cardElement || !elements) return;
  //     console.log("cardElement", cardElement);
  //
  //     const stripeResponse = await stripe.createPaymentMethod({
  //       type: "card",
  //       card: cardElement,
  //     });
  //     const { error, paymentMethod } = stripeResponse;
  //     console.log("error", error);
  //     if (error || !paymentMethod) {
  //       return;
  //     }
  //
  //     const paymentMethodId = paymentMethod.id;
  //     mutate({ paymentMethodId, amount: amountToCharge });
  //   },
  //   [elements, mutate, stripe],
  // );

  return (
    <div className={cln("wrapper")}>
      <Segmented
        className={cln("segmented")}
        options={segments}
        onResize={undefined}
        onResizeCapture={undefined}
        block
        size="large"
        value={segmentSelected}
        onChange={handleChangeSegment}
      />

      <div className={cln("segment__content")}>
        <PremiumPackages />

        <div className={cln("payment__methods")}>
          <Switch>
            <Case condition={segmentSelected === "credit-card"}>
              <CreditCardPayment />
            </Case>

            <Case condition={segmentSelected === "paypal"}>
              <PaypalPayment />
            </Case>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default PaymentsView;
