import { Button, Form, FormInstance, Input, Modal } from "antd";
import Image from "next/image";
import { AiOutlineSend } from "react-icons/ai";
import classNames from "classnames/bind";

import styles from "./UploadFileModal.module.scss";

export type UploadFileModalType = {
  form: FormInstance;
  filesUploadPreview: string[];
  uploadFileLoading: boolean;
  onCancel: () => void;
  onFinish: (_values: any) => void;
};

const cln = classNames.bind(styles);

const UploadFileModal = (props: UploadFileModalType) => {
  const { form, uploadFileLoading, filesUploadPreview, onCancel, onFinish } = props;

  return (
    <Modal open={!!filesUploadPreview?.[0]} onCancel={onCancel} width={400} footer={false}>
      <h3 className={cln("title")}>Send {filesUploadPreview?.length} photos</h3>

      <Form className={cln("form__upload")} form={form} onFinish={onFinish}>
        <Form.Item name="content">
          <div className={cln("custom__scroll custom__scroll--tiny", "form__upload-list")}>
            {filesUploadPreview.map((item, index) => (
              <div key={index} className={cln("form__upload-item")}>
                <Image
                  src={item}
                  width={200}
                  height={120}
                  objectFit="contain"
                  layout="responsive"
                  alt="file"
                />
              </div>
            ))}
          </div>
        </Form.Item>

        <Form.Item name="content">
          <Input placeholder="Caption" size="large" autoFocus />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large" loading={uploadFileLoading}>
            <div className={cln("form__upload-submit")}>
              <span>SEND</span>
              <AiOutlineSend />
            </div>
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UploadFileModal;
