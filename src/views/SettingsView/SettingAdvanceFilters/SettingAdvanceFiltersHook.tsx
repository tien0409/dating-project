import { Form } from "antd";

const useSettingAdvanceFilters = () => {
  const [form] = Form.useForm();

  return { form };
};

export default useSettingAdvanceFilters;
