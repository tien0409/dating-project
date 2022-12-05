import { Form, InputRef } from "antd";
import { EmojiClickData } from "emoji-picker-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useChatStore, useSocketStore } from "@/store";
import { SendMessageType } from "@/types";
import { REQUEST_SEND_MESSAGE } from "@/configs/socket-events";

const useMessageForm = () => {
  const inputRef = useRef<InputRef>(null);

  const [visibleEmoji, setVisibleEmoji] = useState(false);

  const [form] = Form.useForm();

  const socket = useSocketStore((store) => store.socket);
  const receiverParticipant = useChatStore((state) => state.receiverParticipant);
  const senderParticipant = useChatStore((state) => state.senderParticipant);
  const messageReply = useChatStore((state) => state.messageReply);
  const conversationId = useChatStore((state) => state.conversationId);
  const setMessageReply = useChatStore((state) => state.setMessageReply);

  const handleToggleVisibleEmoji = useCallback(() => {
    setVisibleEmoji(!visibleEmoji);
  }, [visibleEmoji]);

  const handleEmojiClick = useCallback(
    (emojiData: EmojiClickData) => {
      const inputCurrentValue = form.getFieldValue("content");
      const cursorPositionIndex = inputRef.current?.input?.selectionStart;
      const newValue = cursorPositionIndex
        ? inputCurrentValue?.substring(0, cursorPositionIndex) +
          emojiData?.emoji +
          inputCurrentValue?.substring(cursorPositionIndex + 1)
        : inputCurrentValue || "" + emojiData?.emoji;
      form.setFieldValue("content", newValue);
    },
    [form],
  );

  const handleFinish = useCallback(
    (values: any) => {
      const { content } = values;
      if (!content?.trim()) return;

      if (receiverParticipant?.id && senderParticipant?.id && conversationId) {
        const payload: SendMessageType = {
          content,
          conversationId,
          receiverParticipantId: receiverParticipant?.id,
          senderParticipantId: senderParticipant?.id,
          replyTo: messageReply,
        };
        socket.emit(REQUEST_SEND_MESSAGE, payload);
        setMessageReply(undefined);
        form.resetFields();
      }
    },
    [
      conversationId,
      form,
      messageReply,
      receiverParticipant?.id,
      senderParticipant?.id,
      setMessageReply,
      socket,
    ],
  );

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
  }, [handleDocumentClick]);

  return { inputRef, visibleEmoji, form, handleToggleVisibleEmoji, handleEmojiClick, handleFinish };
};

export default useMessageForm;
