import { toast } from "react-toastify";
import { Form } from "antd";
import { useState, useMemo } from "react";

import { SignUpType } from "@/src/types/auth/SignUpType";
import authRepository from "@/src/repositories/authRepository";
import {
  confirmPasswordValidator,
  emailValidator,
  passwordValidator,
} from "@/src/utils/validators";
import { RegisterFormProps } from "./index";

const useRegisterFormHook = (props: RegisterFormProps) => {
  const { setFormType } = props;

  const [agreeTermPrivacy, setAgreeTermPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

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
      const data = await authRepository.signup(payload);
      toast.success(data.message);
      handleSignIn();
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
};

export default useRegisterFormHook;
