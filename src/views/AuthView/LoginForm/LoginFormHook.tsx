import { toast } from "react-toastify";
import { useMemo, useState } from "react";
import { Form } from "antd";

import authRepository from "@/src/repositories/authRepository";
import { LoginType } from "@/src/types/auth/LoginType";
import { emailValidator, passwordValidator } from "@/src/utils/validators";
import { LoginFormProps } from "./index";
import { FormType } from "../index";
import { useRouter } from "next/router";
import { DATING_ROUTE } from "@/src/configs/routes";

const useLoginForm = (props: LoginFormProps) => {
  const { setFormType, setCreateInfo } = props;

  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();
  const router = useRouter();

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
      const res = await authRepository.login(payload);
      const resInfo = await authRepository.getUserAuth();
      if (resInfo.data?.fullName) router.push(DATING_ROUTE);
      toast.success(res.message);
      setCreateInfo(true);
    } catch (err: any) {
      toast.error(err?.message);
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
