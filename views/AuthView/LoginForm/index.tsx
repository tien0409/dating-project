import { Button, Form, Input } from "antd";
import className from "classnames/bind";
import Link from "next/link";
import { Dispatch, SetStateAction, useMemo } from "react";
import { RiUserHeartFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import styles from "./LoginForm.module.scss";
import { FORGOT_PASSWORD_ROUTE } from "@/configs/routes";
import { FormType } from "..";

const cln = className.bind(styles);

type Props = {
  setFormType: Dispatch<SetStateAction<FormType>>;
};

const LoginForm = (props: Props) => {
  const { setFormType } = props;

  const [form] = Form.useForm();

  const emailRules = useMemo(() => [{ required: true, message: "Please input your email" }], []);

  const passwordRules = useMemo(
    () => [{ required: true, message: "Please input your password" }],
    [],
  );

  const formLayout = useMemo(
    () => ({
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
    }),
    [],
  );

  const handleRedirect = (type: FormType) => () => {
    setFormType(type);
  };

  const handleSubmit = (values: { email: string; password: string }) => {
    const { email, password } = values;
    // send login
  };

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

      <Form {...formLayout} name="login-form" className="mt-6" onFinish={handleSubmit}>
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
          <Button type="primary" htmlType="submit" size="large" block>
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
        Don't have an account?{" "}
        <span className={cln("sign-up")} onClick={handleRedirect("RegistrationForm")}>
          Sign up
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
