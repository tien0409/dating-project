import { Form, InputRef } from "antd";
import { EmojiClickData } from "emoji-picker-react";
import { useCallback, useEffect, useRef, useState } from "react";

const useMessageForm = () => {
  const inputRef = useRef<InputRef>(null);

  const [visibleEmoji, setVisibleEmoji] = useState(false);

  const [form] = Form.useForm();

  const handleToggleVisibleEmoji = () => {
    setVisibleEmoji(!visibleEmoji);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const inputCurrentValue = form.getFieldValue("content");
    const cursorPositionIndex = inputRef.current?.input?.selectionStart;
    const newValue = cursorPositionIndex
      ? inputCurrentValue?.substring(0, cursorPositionIndex) +
        emojiData?.emoji +
        inputCurrentValue?.substring(cursorPositionIndex + 1)
      : inputCurrentValue || "" + emojiData?.emoji;
    form.setFieldValue("content", newValue);
  };

  const handleFinish = (values: any) => {
    const { content } = values;
    if (!content?.trim()) return;

    form.resetFields();
  };

  const handleDocumentClick = useCallback((e: any) => {
    let isEmojiFound = false;

    e?.path?.forEach((ele: any) => {
      if (ele && ele.id) {
        const data = ele.classList.value;
        if (data.includes("emoji")) {
          isEmojiFound = true;
        }
      }
    });

    if (
      !isEmojiFound &&
      e.target.id !== "emoji__btn" &&
      !e.target.classList.value.includes("EmojiPicker")
    ) {
      setVisibleEmoji(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick, false);

    return () => {
      document.removeEventListener("click", handleDocumentClick, false);
    };
  }, []);

  return { inputRef, visibleEmoji, form, handleToggleVisibleEmoji, handleEmojiClick, handleFinish };
};

export default useMessageForm;
