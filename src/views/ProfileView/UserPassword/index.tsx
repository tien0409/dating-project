import classNames from "classnames/bind";
import { Button, Form, Input } from "antd";

import styles from "./UserPassword.module.scss";
import useUserPassword from "./UserPasswordHook";
import ProfileContainer from "../ProfileContainer";
import { confirmNewPasswordValidator, passwordValidator } from "@/utils/validators";

const cln = classNames.bind(styles);

const UserPassword = () => {
  const { form, isLoading, handleFinish, handleCancel } = useUserPassword();

  return (
    <ProfileContainer title="Password">
      <div className={cln("wrapper")}>
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            name="password"
            required
            rules={[{ validator: passwordValidator }]}
            hasFeedback
          >
            <Input.Password placeholder="Enter current password" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            required
            rules={[{ validator: passwordValidator }]}
            hasFeedback
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            required
            rules={[confirmNewPasswordValidator]}
            hasFeedback
          >
            <Input.Password placeholder="Enter confirm password" />
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

export default UserPassword;
