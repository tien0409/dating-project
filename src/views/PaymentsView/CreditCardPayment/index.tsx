import classNames from "classnames/bind";
import { Button, Col, Form, Input, Row } from "antd";

import styles from "./CreditCardPayment.module.scss";

const cln = classNames.bind(styles);

const CreditCardPayment = () => {
  return (
    <div className={cln("wrapper")}>
      <h3 className={cln("title")}>Enter your card details</h3>

      <div className={cln("main__card")}>
        <Form layout="vertical">
          <Form.Item label={<label className={cln("label")}>Card number</label>}>
            <Col span={13}>
              <Input placeholder="0000 0000 0000 0000" />
            </Col>
          </Form.Item>

          <Row>
            <Col span={13}>
              <Form.Item label={<label className={cln("label")}>Cardholder name</label>}>
                <Input placeholder="NAME ON THE CARD" />
              </Form.Item>
            </Col>
            <Col span={1}>&nbsp;</Col>

            <Col span={10}>
              <Form.Item label={<label className={cln("label")}>Expiry date</label>}>
                <Row gutter={3}>
                  <Col span={10}>
                    <Input placeholder="mm" />
                  </Col>
                  <Col span={1}>
                    <span className={cln("divider")}>/</span>
                  </Col>
                  <Col span={13}>
                    <Input placeholder="yyyy" />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <div className={cln("sub__card")}></div>
      </div>

      <div className={cln("btn")}>
        <Button size="large" shape="round" type="primary">
          Accept and Pay
        </Button>
      </div>
    </div>
  );
};

export default CreditCardPayment;
