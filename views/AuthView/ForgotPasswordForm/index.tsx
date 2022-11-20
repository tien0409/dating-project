import { Button, Checkbox, Form, Input } from "antd";
import className from "classnames/bind";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { GiHeartKey } from "react-icons/gi";

import styles from "./ForgotPasswordForm.module.scss";
import { FormType } from "..";
import { emailValidator } from "@/utils/validators";

const cln = className.bind(styles);

type Props = {
  setFormType: Dispatch<SetStateAction<FormType>>;
};

const ForgotPasswordForm = (props: Props) => {
  const { setFormType } = props;

  const [form] = Form.useForm();

  const emailRules = useMemo(
    () => [{ required: true, message: "Please input your email" }, { validator: emailValidator }],
    [],
  );

  const formLayout = useMemo(
    () => ({
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
    }),
    [],
  );

  const handleSignIn = () => {
    setFormType("LoginForm");
  };

  const handleSubmit = (values: { email: string }) => {
    const { email } = values;
    // send login
  };

  return (
    <div>
      <div className={cln("heading")}>
        <div className={cln("heading-icon")}>
          <GiHeartKey />
        </div>
        <h2 className={cln("heading-text")}>Forgot password</h2>
      </div>
      <p className={cln("heading-description")}>
        Enter your email that you used to register <br /> your account, so we can send you a link to{" "}
        <br /> reset your password
      </p>

      <Form {...formLayout} name="forgot-password-form" className="mt-6" onFinish={handleSubmit}>
        <Form.Item name="email" label="Email" rules={emailRules} hasFeedback>
          <Input size="large" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block>
            Send link
          </Button>
        </Form.Item>
      </Form>

      <div className="mt-12 subtext-color text-center">
        Back to{" "}
        <span className={cln("sign-in")} onClick={handleSignIn}>
          Login
        </span>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
