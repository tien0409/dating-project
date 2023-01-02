import { Form } from "antd";

import { useAuthStore } from "@/store";

const useUserBasicInfo = () => {
  const profile = useAuthStore((state) => state.profile);

  const [form] = Form.useForm();

  return { form, profile };
};

export default useUserBasicInfo;
