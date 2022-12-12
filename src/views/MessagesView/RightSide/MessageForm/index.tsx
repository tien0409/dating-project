import { Button, Form, Input, Modal } from "antd";
import classNames from "classnames/bind";
import dynamic from "next/dynamic";
import { BsEmojiSmile } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import { memo } from "react";

import styles from "./MessageForm.module.scss";
import useMessageForm from "./MessageFormHook";
import Avatar from "@/assets/images/avatar.jpg";
import Image from "next/image";
import { AiOutlineSend } from "react-icons/all";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });
const cln = classNames.bind(styles);

const MessageForm = () => {
  const {
    inputFormEl,
    fileAttachRef,
    visibleEmoji,
    filesUpload,
    form,
    handleEmojiClick,
    handleToggleVisibleEmoji,
    handleChooseFile,
    handleTyping,
    handleChangeFileAttach,
    handleCancelSendFile,
    handleFinish,
  } = useMessageForm();

  return (
    <div className={cln("wrapper")}>
      <Form
        className={cln("form")}
        form={form}
        initialValues={{ content: "" }}
        name={"messageForm"}
        onFinish={handleFinish}
      >
        <div className={cln("form__item-wrapper")}>
          <Form.Item noStyle name="content">
            <Input
              className={cln("input")}
              size="large"
              placeholder="Your message..."
              autoFocus
              ref={inputFormEl}
              onKeyDown={handleTyping}
            />
          </Form.Item>
          <div className={cln("icon__suffix")}>
            <GrAttachment size={20} cursor="pointer" onClick={handleChooseFile} />
            <input type="file" hidden ref={fileAttachRef} onChange={handleChangeFileAttach} />
            <Modal
              open={!!filesUpload?.[0]}
              onCancel={handleCancelSendFile}
              width={400}
              footer={false}
            >
              <h3 className={cln("modal__upload-title")}>Send {filesUpload?.length} photos</h3>

              <Form className={cln("form__upload")}>
                <Form.Item>
                  <div className={cln("custom__scroll custom__scroll--tiny", "form__upload-list")}>
                    {Array(3)
                      .fill(0)
                      .map((_item, index) => (
                        <div key={index}>
                          <Image
                            src={Avatar}
                            width={200}
                            height={200}
                            objectFit="cover"
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
                  <Button type="primary" htmlType="submit" block size="large">
                    <div className={cln("form__upload-submit")}>
                      <span>SEND</span>
                      <AiOutlineSend />
                    </div>
                  </Button>
                </Form.Item>
              </Form>
            </Modal>

            <BsEmojiSmile
              id="emoji__btn"
              size={20}
              cursor="pointer"
              onClick={handleToggleVisibleEmoji}
            />

            <div
              id="message__emoji-wrapper"
              className={cln("emoji", {
                visible: visibleEmoji,
              })}
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
            <Button hidden htmlType="submit"></Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default memo(MessageForm);
