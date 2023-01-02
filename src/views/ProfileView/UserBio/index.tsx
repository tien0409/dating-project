import classNames from "classnames/bind";
import { Button, Form, Input } from "antd";

import styles from "./UserBio.module.scss";
import ProfileContainer from "../ProfileContainer";
import useUserBio from "./UserBioHook";

const cln = classNames.bind(styles);

const UserBio = () => {
  const { isLoading, initForm, form, handleFinish, handleCancel } = useUserBio();

  return (
    <ProfileContainer title={"About me"}>
      <div>
        <Form form={form} initialValues={initForm} onFinish={handleFinish}>
          <Form.Item name="bio">
            <Input.TextArea rows={4} placeholder="A little bit about you..." />
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

export default UserBio;
