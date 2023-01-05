import { Button, Checkbox, Form, Input } from "antd";
import className from "classnames/bind";
import { Dispatch, SetStateAction } from "react";
import { RiUserHeartFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import styles from "./RegisterForm.module.scss";
import { FormType } from "../index";
import useRegisterFormHook from "./RegisterFormHook";

const cln = className.bind(styles);

export type RegisterFormProps = {
  setFormType: Dispatch<SetStateAction<FormType>>;
};

const RegisterForm = (props: RegisterFormProps) => {
  const {
    isLoading,
    agreeTermPrivacy,
    form,
    emailRules,
    passwordRules,
    confirmPasswordRules,
    formLayout,
    handleChangeCheckbox,
    handleSubmit,
    handleSignIn,
  } = useRegisterFormHook(props);

  return (
    <div>
      <div className={cln("heading")}>
        <div className={cln("heading-icon")}>
          <RiUserHeartFill />
        </div>
        <h2 className={cln("heading-text")}>Sign up</h2>
      </div>
      <p className={cln("heading-description")}>
        Create your account - enjoy our services <br /> with most updated features.
      </p>

      <Form
        {...formLayout}
        name="register-form"
        className="mt-6"
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item name="email" label="Email" rules={emailRules} hasFeedback>
          <Input size="large" />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback>
          <Input.Password size="large" autoComplete="new-password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm password"
          rules={confirmPasswordRules}
          hasFeedback
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item>
          <Checkbox checked={agreeTermPrivacy} onChange={handleChangeCheckbox}>
            I agree with Terms and Privacy
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            disabled={!agreeTermPrivacy}
            loading={isLoading}
          >
            Sign up
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
        Already have an account?{" "}
        <span className={cln("sign-in")} onClick={handleSignIn}>
          Login
        </span>
      </div>
    </div>
  );
};

export default RegisterForm;
