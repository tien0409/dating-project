import { Button, Form, Input } from "antd";
import className from "classnames/bind";
import { Dispatch, SetStateAction } from "react";
import { RiUserHeartFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import styles from "./LoginForm.module.scss";
import { FormType } from "../index";
import useLoginForm from "./LoginFormHook";

const cln = className.bind(styles);

export type LoginFormProps = {
  setFormType: Dispatch<SetStateAction<FormType>>;
  setCreateInfo: Dispatch<SetStateAction<boolean>>;
};

const LoginForm = (props: LoginFormProps) => {
  const { isLoading, form, emailRules, passwordRules, formLayout, handleRedirect, handleSubmit } =
    useLoginForm(props);

  return (
    <div>
      <div className={cln("heading")}>
        <div className={cln("heading-icon")}>
          <RiUserHeartFill />
        </div>
        <h2 className={cln("heading-text")}>Login</h2>
      </div>
      <p className={cln("heading-description")}>
        Login to your account - enjoy exclusive <br /> features and find your love
      </p>

      <Form {...formLayout} name="login-form" className="mt-6" onFinish={handleSubmit} form={form}>
        <Form.Item name="email" label="Email" rules={emailRules} hasFeedback>
          <Input size="large" />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback>
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item>
          <span className={cln("forgot-password")} onClick={handleRedirect("ForgotPasswordForm")}>
            Forgot password
          </span>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block loading={isLoading}>
            Login
          </Button>
        </Form.Item>
      </Form>

      <div className="subtext-color text-center">OR</div>

      <div className={cln("social-networks")}>
        <Button block size="large">
          <div className={cln("social-networks-item")}>
            <FcGoogle size={18} />
            <span>Google</span>
          </div>
        </Button>
        <Button block size="large">
          <div className={cln("social-networks-item")}>
            <FaFacebook size={18} color="blue" />
            <span>Facebook</span>
          </div>
        </Button>
      </div>

      <div className="mt-12 subtext-color text-center">
        Don&apos;t have an account?&nbsp;
        <span className={cln("sign-up")} onClick={handleRedirect("RegistrationForm")}>
          Sign up
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
