import { Button, Col, DatePicker, Form, Input, Row, Upload, UploadFile } from "antd";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames/bind";
import { RcFile } from "antd/es/upload";

import styles from "./CreateAccountForm.module.scss";
import { GenderSelect } from "@/src/components";
import {
  birthdayValidator,
  firstNameValidator,
  genderValidator,
  lastNameValidator,
} from "@/src/utils/validators";
import { PlusOutlined } from "@ant-design/icons";

const cln = classNames.bind(styles);

const CreateAccountForm = () => {
  const [genderSelected, setGenderSelected] = useState("");
  const [fileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [form] = Form.useForm();

  const formItemLayout = useMemo(
    () => ({
      labelCol: {
        span: 24,
      },
      wrapperCol: { span: 24 },
    }),
    [],
  );

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  // const handleAction = (file: File) => {
  //   console.log(file);
  // };
  //

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1));
  };

  useEffect(() => {
    form.setFieldValue("gender", genderSelected);
  }, [form, genderSelected]);

  return (
    <div className={cln("container", "wrapper")}>
      <h1 className={cln("title")}>Create account</h1>

      <Form name="createAccount" {...formItemLayout} form={form} onFinish={handleSubmit}>
        <Row gutter={24}>
          <Col>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ validator: firstNameValidator }]}
            >
              <Input size="large" placeholder="Enter your first name" showCount maxLength={20} />
            </Form.Item>
          </Col>
          <Col>
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
              name="brithday"
              required
              rules={[{ validator: birthdayValidator }]}
            >
              <DatePicker
                size="large"
                style={{ width: "100%" }}
                placeholder="Enter your birthday"
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="Gender"
              name="gender"
              required
              rules={[{ validator: genderValidator }]}
            >
              <GenderSelect genderSelected={genderSelected} setGenderSelected={setGenderSelected} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Profile images" valuePropName="files">
          <Upload action="/upload.do" listType="picture-card" multiple maxCount={6}>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

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
          <Button type="primary" size="large" htmlType="submit" shape="round">
            <span className={cln("sign__up-text")}>Sign up</span>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateAccountForm;
