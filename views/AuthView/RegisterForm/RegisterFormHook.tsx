import { toast } from "react-toastify";
import { Form } from "antd";
import { useState, useMemo } from "react";

import { SignUpType } from "@/types/auth/SignUpType";
import useCancelPromise from "@/hooks/useCancelPromise";
import authRepository from "@/repositories/authRepository";
import { confirmPasswordValidator, emailValidator, passwordValidator } from "@/utils/validators";
import { RegisterFormProps } from ".";

const useRegisterFormHook = (props: RegisterFormProps) => {
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
