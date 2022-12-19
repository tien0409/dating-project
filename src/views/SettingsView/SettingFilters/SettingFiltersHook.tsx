import { Form } from "antd";

const useSettingFilters = () => {
  const [form] = Form.useForm();

  return { form };
};

export default useSettingFilters;
