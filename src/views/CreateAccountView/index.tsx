import { Button, Col, DatePicker, Form, Input, Modal, Row, Upload } from "antd";
import classNames from "classnames/bind";
import { PlusOutlined } from "@ant-design/icons";

import styles from "./CreateAccountView.module.scss";
import { GenderSelect } from "@/components";
import {
  birthdayValidator,
  firstNameValidator,
  genderValidator,
  lastNameValidator,
} from "@/utils/validators";
import useCreateAccountView from "./CreateAccountViewHook";
import Image from "next/image";

const cln = classNames.bind(styles);

const CreateAccountView = () => {
  const {
    formItemLayout,
    form,
    isLoading,
    genders,
    genderSelected,
    setGenderSelected,
    previewOpen,
    previewTitle,
    previewImage,
    handleCancelPreview,
    handlePreview,
    handleSubmit,
    handleChangeUpload,
  } = useCreateAccountView();

  return (
    <div className={cln("container", "wrapper")}>
      <h1 className={cln("title")}>Create account</h1>

      <Form name="createAccount" {...formItemLayout} form={form} onFinish={handleSubmit}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ validator: firstNameValidator }]}
            >
              <Input size="large" placeholder="Enter your first name" showCount maxLength={20} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ validator: lastNameValidator }]}
            >
              <Input size="large" placeholder="Enter your last name" showCount maxLength={15} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Birthday"
              name="birthday"
              required
              rules={[{ validator: birthdayValidator }]}
            >
              <DatePicker
                format={"DD/MM/YYYY"}
                size="large"
                style={{ width: "100%" }}
                placeholder="Enter your birthday"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Gender"
              name="gender"
              required
              rules={[{ validator: genderValidator }]}
            >
              <GenderSelect
                genders={genders}
                genderSelected={genderSelected}
                setGenderSelected={setGenderSelected}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Profile images" valuePropName="files">
          <Upload
            listType="picture-card"
            multiple
            maxCount={6}
            onChange={handleChangeUpload}
            onPreview={handlePreview}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancelPreview}
          width={700}
        >
          <Image
            src={previewImage}
            alt={previewTitle}
            objectFit="cover"
            layout="responsive"
            width={700}
            height={700}
          />
        </Modal>

        <Form.Item label="Bio" name="bio">
          <Input.TextArea
            rows={6}
            showCount
            maxLength={1000}
            placeholder="Enter your bio"
            size="large"
          />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" size="large" htmlType="submit" shape="round" loading={isLoading}>
            <span className={cln("sign__up-text")}>Sign up</span>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateAccountView;
