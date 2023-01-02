import classNames from "classnames/bind";
import { Button, Form, Input } from "antd";

import styles from "./UserBio.module.scss";
import ProfileContainer from "../ProfileContainer";

const cln = classNames.bind(styles);

const UserBio = () => {
  return (
    <ProfileContainer title={"About me"}>
      <div>
        <Form>
          <Form.Item>
            <Input.TextArea rows={4} placeholder="A little bit about you..." />
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

export default UserBio;
