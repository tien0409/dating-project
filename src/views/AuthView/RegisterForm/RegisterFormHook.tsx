import { toast } from "react-toastify";
import { Form } from "antd";
import { useState, useMemo } from "react";

import { RegisterFormProps } from ".";
import { AxiosResponseType, SignUpType } from "@/types";
import { useRegisterData } from "@/hooks/useAuthData";
import { confirmPasswordValidator, emailValidator, passwordValidator } from "@/utils/validators";

const useRegisterFormHook = (props: RegisterFormProps) => {
  const { setFormType } = props;

  const [agreeTermPrivacy, setAgreeTermPrivacy] = useState(false);

  const [form] = Form.useForm();

  const handleSuccesss = (res: AxiosResponseType) => {
    toast.success(res.message);
    handleSignIn();
  };

  const handleError = (error: any) => {
    toast.error(error?.message);
  };

  const { mutate, isLoading } = useRegisterData({
    onSuccess: handleSuccesss,
    onError: handleError,
  });

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
    mutate(payload);
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
