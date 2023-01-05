import { Form } from "antd";
import { toast } from "react-toastify";
import { useCallback } from "react";

import { UpdatePasswordType } from "@/types";
import { useUpdatePasswordData, useUpdateProfileData } from "@/hooks/useUsersData";
import _isArray from "lodash/isArray";

const useUserPassword = () => {
  const [form] = Form.useForm<UpdatePasswordType>();

  const handleSuccess = useCallback(() => {
    form.resetFields();
    toast.success("Password successfully updated");
  }, [form]);

  const handleError = useCallback((error: any) => {
    if (_isArray(error?.message)) {
      error.message.forEach((message: string) => toast.error(message));
    } else toast.error(error?.message);
  }, []);

  const { mutate, isLoading } = useUpdatePasswordData({
    onError: handleError,
    onSuccess: handleSuccess,
  });

  const handleFinish = () => {
    mutate(form.getFieldsValue());
  };

  const handleCancel = () => {
    form.resetFields();
  };

  return { form, isLoading, handleFinish, handleCancel };
};

export default useUserPassword;
