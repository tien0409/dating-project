import { Button, Checkbox, Form, Input } from "antd";
import className from "classnames/bind";
import { Dispatch, SetStateAction } from "react";
import { GiHeartKey } from "react-icons/gi";

import styles from "./ForgotPasswordForm.module.scss";
import { FormType } from "../index";
import useForgotPasswordHook from "./ForgotPasswordFormHook";

const cln = className.bind(styles);

export type ForgotPasswordFormProps = {
  setFormType: Dispatch<SetStateAction<FormType>>;
};

const ForgotPasswordForm = (props: ForgotPasswordFormProps) => {
  const { form, emailRules, formLayout, handleSignIn, handleSubmit } = useForgotPasswordHook(props);

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

      <Form
        {...formLayout}
        name="forgot-password-form"
        className="mt-6"
        form={form}
        onFinish={handleSubmit}
      >
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
