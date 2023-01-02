import classNames from "classnames/bind";
import { Button, Col, DatePicker, Form, Input, Row } from "antd";

import styles from "./UserBasicInfo.module.scss";
import useUserBasicInfo from "./UserBasicInfoHook";
import ProfileContainer from "../ProfileContainer";
import { GenderSelect } from "@/components";
import {
  birthdayValidator,
  firstNameValidator,
  genderValidator,
  lastNameValidator,
} from "@/utils/validators";

const cln = classNames.bind(styles);

const UserBasicInfo = () => {
  const { form, initForm, isLoading, handleFinish, handleCancel } = useUserBasicInfo();

  return (
    <ProfileContainer title="My Basic">
      <div className={cln("wrapper")}>
        <Form form={form} initialValues={initForm} onFinish={handleFinish}>
          <Row gutter={5}>
            <Col span={12}>
              <Form.Item name="firstName" required rules={[{ validator: firstNameValidator }]}>
                <Input placeholder="First name" maxLength={20} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="lastName" required rules={[{ validator: lastNameValidator }]}>
                <Input placeholder="Last name" maxLength={15} />
              </Form.Item>
            </Col>
          </Row>

          <h3 className={cln("title")}>Your birthday</h3>
          <Form.Item name="birthday" required rules={[{ validator: birthdayValidator }]}>
            <DatePicker
              format={"DD/MM/YYYY"}
              size="large"
              style={{ width: "100%" }}
              placeholder="Enter your birthday"
            />
          </Form.Item>

          <h3 className={cln("title")}>Your gender</h3>
          <Form.Item name="userGender" required rules={[{ validator: genderValidator }]}>
            <GenderSelect form={form} field="userGender" />
          </Form.Item>

          <Form.Item>
            <div className={cln("btn__wrapper")}>
              <Button shape="round" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" shape="round" htmlType="submit" loading={isLoading}>
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
