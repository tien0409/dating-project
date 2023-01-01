import classNames from "classnames/bind";
import { CardElement } from "@stripe/react-stripe-js";

import styles from "./CreditCardPayment.module.scss";
import { Button } from "antd";

const cln = classNames.bind(styles);

export type CreditCardPaymentProps = {
  loading: boolean;
  onPayment: () => void;
};

const CreditCardPayment = (props: CreditCardPaymentProps) => {
  const { loading, onPayment } = props;

  return (
    <div className={cln("wrapper")}>
      <CardElement />
      {/*<h3 className={cln("title")}>Enter your card details</h3>*/}

      {/*<div className={cln("main__card")}>*/}
      {/*  <Form layout="vertical">*/}
      {/*    <Form.Item label={<label className={cln("label")}>Card number</label>}>*/}
      {/*      <Col span={13}>*/}
      {/*        <Input*/}
      {/*          placeholder="0000 0000 0000 0000"*/}
      {/*          maxLength={16}*/}
      {/*          value={form.cardNumber}*/}
      {/*          onChange={handleChangeForm("cardNumber")}*/}
      {/*        />*/}
      {/*      </Col>*/}
      {/*    </Form.Item>*/}

      {/*    <Row>*/}
      {/*      <Col span={13}>*/}
      {/*        <Form.Item label={<label className={cln("label")}>Cardholder name</label>}>*/}
      {/*          <Input*/}
      {/*            placeholder="NAME ON THE CARD"*/}
      {/*            value={form.cardName}*/}
      {/*            onChange={handleChangeForm("cardName")}*/}
      {/*          />*/}
      {/*        </Form.Item>*/}
      {/*      </Col>*/}
      {/*      <Col span={1}>&nbsp;</Col>*/}

      {/*      <Col span={10}>*/}
      {/*        <Form.Item label={<label className={cln("label")}>Expiry date</label>}>*/}
      {/*          <Row gutter={3}>*/}
      {/*            <Col span={10}>*/}
      {/*              <Input*/}
      {/*                placeholder="mm"*/}
      {/*                maxLength={2}*/}
      {/*                value={form.cardMonth}*/}
      {/*                onChange={handleChangeForm("cardMonth")}*/}
      {/*              />*/}
      {/*            </Col>*/}
      {/*            <Col span={1}>*/}
      {/*              <span className={cln("divider")}>/</span>*/}
      {/*            </Col>*/}
      {/*            <Col span={13}>*/}
      {/*              <Input*/}
      {/*                placeholder="yyyy"*/}
      {/*                maxLength={4}*/}
      {/*                value={form.cardYear}*/}
      {/*                onChange={handleChangeForm("cardYear")}*/}
      {/*              />*/}
      {/*            </Col>*/}
      {/*          </Row>*/}
      {/*        </Form.Item>*/}
      {/*      </Col>*/}
      {/*    </Row>*/}
      {/*  </Form>*/}

      {/*  <div className={cln("sub__card")}>*/}
      {/*    <div className={cln("cvc")}>*/}
      {/*      <Form.Item label={<label>CVC2/CVV2</label>}>*/}
      {/*        <Input maxLength={3} value={form.cardCvc} onChange={handleChangeForm("cardCvc")} />*/}
      {/*      </Form.Item>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className={cln("btn")}>
        <Button size="large" shape="round" type="primary" loading={loading} onClick={onPayment}>
          Accept and Pay
        </Button>
      </div>
    </div>
  );
};

export default CreditCardPayment;
