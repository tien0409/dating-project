import { Form } from "antd";
import { toast } from "react-toastify";
import { useCallback, useMemo } from "react";

import { useUpdateProfileData } from "@/hooks/useUsersData";
import { useAuthStore } from "@/store";

const useUserBio = () => {
  const profile = useAuthStore((state) => state.profile);
  const setProfile = useAuthStore((state) => state.setProfile);

  const [form] = Form.useForm();

  const initForm = useMemo(
    () => ({
      bio: profile?.bio,
    }),
    [profile?.bio],
  );

  const handleSuccess = useCallback(() => {
    setProfile({
      ...profile,
      bio: form.getFieldValue("bio"),
    });
    toast.success("Update profile successfully");
  }, [form, profile, setProfile]);

  const handleError = useCallback((error: any) => {
    toast.error(error?.response?.data?.message);
  }, []);

  const { mutate, isLoading } = useUpdateProfileData({
    onError: handleError,
    onSuccess: handleSuccess,
  });

  const handleFinish = () => {
    mutate(form.getFieldsValue());
  };

  const handleCancel = () => {
    form.resetFields();
  };

  return { form, initForm, isLoading, handleFinish, handleCancel };
};

export default useUserBio;
