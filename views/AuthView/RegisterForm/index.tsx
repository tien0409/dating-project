import { Button, Checkbox, Form, Input, message } from "antd";
import className from "classnames/bind";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { RiUserHeartFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import styles from "./RegisterForm.module.scss";
import { FormType } from "..";
import { SignUpType } from "@/types/auth/SignUpType";
import useCancelPromise from "@/hooks/useCancelPromise";
import authRepository from "@/repositories/authRepository";
import { confirmPasswordValidator, emailValidator, passwordValidator } from "@/utils/validators";

const cln = className.bind(styles);

type Props = {
  setFormType: Dispatch<SetStateAction<FormType>>;
};

const RegisterForm = (props: Props) => {
  const { setFormType } = props;

  const [agreeTermPrivacy, setAgreeTermPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();
  const { cancelablePromise } = useCancelPromise();

  const emailRules = useMemo(
    () => [{ required: true, message: "Please input your email" }, { validator: emailValidator }],
    [],
  );

  const passwordRules = useMemo(
    () => [
      { required: true, message: "Please input your password" },
      { validator: passwordValidator },
    ],
    [],
  );

  const confirmPasswordRules = useMemo(
    () => [
      { required: true, message: "Please input again your password" },
      confirmPasswordValidator,
    ],
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

  const handleChangeCheckbox = (e: any) => {
    setAgreeTermPrivacy(e.target.checked);
  };

  const handleSubmit = async (payload: SignUpType) => {
    try {
      setIsLoading(true);
      const data = await cancelablePromise(authRepository.signup(payload));
      toast.success(data.message);
      handleSignIn();
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  };

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
          name="confirmPasssword"
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
