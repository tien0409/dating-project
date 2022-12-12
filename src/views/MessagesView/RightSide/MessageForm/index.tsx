import { Button, Form, Input } from "antd";
import classNames from "classnames/bind";
import dynamic from "next/dynamic";
import { BsEmojiSmile } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import { memo } from "react";

import styles from "./MessageForm.module.scss";
import useMessageForm from "./MessageFormHook";
import UploadFileModal from "@/views/MessagesView/RightSide/MessageForm/UploadFileModal";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });
const cln = classNames.bind(styles);

const MessageForm = () => {
  const {
    inputFormEl,
    fileAttachRef,
    visibleEmoji,
    filesUploadPreview,
    uploadFileLoading,
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
          <Form.Item noStyle name={!filesUploadPreview?.length ? "content" : ""}>
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
            <input
              type="file"
              multiple
              hidden
              ref={fileAttachRef}
              onChange={handleChangeFileAttach}
            />
            <UploadFileModal
              form={form}
              uploadFileLoading={uploadFileLoading}
              filesUploadPreview={filesUploadPreview}
              onCancel={handleCancelSendFile}
              onFinish={handleFinish}
            />

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
