import classNames from "classnames/bind";
import { Dispatch, SetStateAction } from "react";
import { Button, Checkbox, Radio, Space } from "antd";
import { LeftOutlined } from "@ant-design/icons";

import styles from "./GenderConfig.module.scss";
import useGenderConfig from "./GenderConfigHook";
import { GenderType } from "@/types";

const cln = classNames.bind(styles);

export type GenderConfigProps = {
  genderSpecialSelected?: GenderType;
  setNextConfig: Dispatch<SetStateAction<boolean>>;
  setGenderSpecialSelected: Dispatch<SetStateAction<GenderType | undefined>>;
  onCancel: (_genderSpecialSelected?: GenderType) => void;
};

const GenderConfig = (props: GenderConfigProps) => {
  const {
    showMeInSearchesAs,
    isPrivacy,
    gendersNormal,
    handleGoBack,
    handleChangeSearchable,
    handleChangePrivacy,
    handleFinish,
  } = useGenderConfig(props);

  return (
    <div className={cln("wrapper")}>
      <Button icon={<LeftOutlined />} onClick={handleGoBack}></Button>

      <div className={cln("configs")}>
        <div className={cln("searchable__config")}>
          <h4 className={cln("title")}>I’d like to be shown to...</h4>
          <Radio.Group
            size="large"
            value={showMeInSearchesAs}
            className={cln("searchable__config-list")}
            onChange={handleChangeSearchable}
          >
            <Space direction="vertical" className={cln("searchable__config-space")}>
              <Radio value={gendersNormal[0]} className={cln("searchable__config-item")}>
                People looking for women
              </Radio>
              <Radio value={gendersNormal[1]} className={cln("searchable__config-item")}>
                People looking for men
              </Radio>
            </Space>
          </Radio.Group>
        </div>

        <div className={cln("privacy__config")}>
          <h4 className={cln("title")}>Privacy</h4>
          <Checkbox
            className={cln("privacy__config-item")}
            checked={isPrivacy}
            onChange={handleChangePrivacy}
          >
            Show my identity
          </Checkbox>
          <p className={cln("privacy__config-describe")}>
            Turning this off means your gender identity won’t be visible on your profile
          </p>
        </div>
      </div>

      <Button type="primary" block disabled={!showMeInSearchesAs} onClick={handleFinish}>
        Continue
      </Button>
    </div>
  );
};

export default GenderConfig;
