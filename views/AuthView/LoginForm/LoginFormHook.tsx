import { toast } from "react-toastify";
import { useMemo, useState } from "react";
import { Form } from "antd";

import authRepository from "@/repositories/authRepository";
import useCancelPromise from "@/hooks/useCancelPromise";
import { LoginType } from "@/types/auth/LoginType";
import { emailValidator, passwordValidator } from "@/utils/validators";
import { LoginFormProps } from ".";
import { FormType } from "..";
import { useRouter } from "next/router";
import { DATING_ROUTE } from "@/configs/routes";

const useLoginForm = (props: LoginFormProps) => {
  const { setFormType } = props;

  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();
  const router = useRouter();

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

  const handleSubmit = async (payload: LoginType) => {
    try {
      setIsLoading(true);
      const data = await cancelablePromise(authRepository.login(payload));
      router.push(DATING_ROUTE);
      toast.success(data.message);
    } catch (_) {
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    form,
    emailRules,
    passwordRules,
    formLayout,
    handleRedirect,
    handleSubmit,
  };
};

export default useLoginForm;
