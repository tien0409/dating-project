import classNames from "classnames/bind";
import { Form, Slider } from "antd";

import styles from "./SettingFilters.module.scss";
import useSettingFilters from "./SettingFiltersHook";
import { GenderSelect } from "@/components";
import SettingContainer from "../SettingContainer";

const cln = classNames.bind(styles);

const SettingFilters = () => {
  const { form } = useSettingFilters();

  return (
    <SettingContainer title={"Filters"}>
      <div className={cln("wrapper")}>
        <Form>
          <h3 className={cln("title")}>I’m interested in...</h3>
          <Form.Item>
            <GenderSelect form={form} field="gender" interestedInGender />
          </Form.Item>

          <h3 className={cln("title")}>Age</h3>
          <Form.Item>
            <div className={cln("age")}>
              <div>Between 18 and 45</div>
              <Slider range defaultValue={[18, 30]} max={70} min={18} />
            </div>
          </Form.Item>
        </Form>
      </div>
    </SettingContainer>
  );
};

export default SettingFilters;
