import classNames from "classnames/bind";
import { Button, Col, Form, Input, Row } from "antd";

import styles from "./UserBasicInfo.module.scss";
import useUserBasicInfo from "./UserBasicInfoHook";
import ProfileContainer from "../ProfileContainer";
import { GenderSelect } from "@/components";
import { genderValidator } from "@/utils/validators";

const cln = classNames.bind(styles);

const UserBasicInfo = () => {
  const { form, profile } = useUserBasicInfo();

  return (
    <ProfileContainer title={"My Basic"}>
      <div className={cln("wrapper")}>
        <Form>
          <Row gutter={5}>
            <Col span={12}>
              <Form.Item>
                <Input placeholder="First name" value={profile?.firstName} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item>
                <Input placeholder="Last name" value={profile?.lastName} />
              </Form.Item>
            </Col>
          </Row>

          <h3 className={cln("title")}>Your gender</h3>
          <Form.Item name="userGender" required rules={[{ validator: genderValidator }]}>
            <GenderSelect form={form} field="gender" interestedInGender />
          </Form.Item>

          <Form.Item>
            <div className={cln("btn__wrapper")}>
              <Button shape="round">Cancel</Button>
              <Button type="primary" shape="round">
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </ProfileContainer>
  );
};

export default UserBasicInfo;
