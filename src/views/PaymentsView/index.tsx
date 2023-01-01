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
  const {
    segmentSelected,
    loading,
    handleChangeSegment,
    handlePaymentWithCreditCard,
  } = usePaymentsView();

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
              <CreditCardPayment onPayment={handlePaymentWithCreditCard} loading={loading} />
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
