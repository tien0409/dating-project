import { Form } from "antd";
import { toast } from "react-toastify";
import moment from "moment/moment";
import { useCallback, useMemo } from "react";
import _pick from "lodash/pick";
import _keys from "lodash/keys";

import { useAuthStore } from "@/store";
import { UpdateBasicInfoType } from "@/types";
import { useUpdateProfileData } from "@/hooks/useUsersData";

const useUserBasicInfo = () => {
  const profile = useAuthStore((state) => state.profile);
  const setProfile = useAuthStore((state) => state.setProfile);

  const [form] = Form.useForm<UpdateBasicInfoType>();

  const handleSuccess = useCallback(() => {
    setProfile({
      ...profile,
      ...(_pick(form.getFieldsValue(), _keys(form.getFieldsValue())) as any),
      fullName:
        form.getFieldValue("firstName").trim() + " " + form.getFieldValue("lastName").trim(),
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

  console.log("profile", profile);
  const initForm: UpdateBasicInfoType = useMemo(
    () => ({
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      birthday: moment(profile?.birthday) || undefined,
      userGender: profile?.userGender,
    }),
    [profile?.birthday, profile?.firstName, profile?.lastName, profile?.userGender],
  );

  const handleFinish = () => {
    mutate(form.getFieldsValue());
  };

  const handleCancel = () => {
    form.resetFields();
  };

  return { form, initForm, profile, isLoading, handleFinish, handleCancel };
};

export default useUserBasicInfo;
