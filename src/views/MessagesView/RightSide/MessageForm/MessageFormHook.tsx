import { Form } from "antd";
import { EmojiClickData } from "emoji-picker-react";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import _debounce from "lodash/debounce";

import {
  useConversationStore,
  useMessageStore,
  useParticipantStore,
  useSocketStore,
} from "@/store";
import { ReqTypingMessageType, SendMessageType } from "@/types";
import {
  REQUEST_SEND_MESSAGE,
  REQUEST_STOP_TYPING_MESSAGE,
  REQUEST_TYPING_MESSAGE,
} from "@/configs/socket-events";
import { typingRegex } from "@/utils/regexes";

const useMessageForm = () => {
  const typingDebounce = useRef<any>();

  const [_isTyping, _setIsTyping] = useState(false);

  const [visibleEmoji, setVisibleEmoji] = useState(false);

  const [form] = Form.useForm();

  const socket = useSocketStore((store) => store.socket);
  const receiverParticipant = useParticipantStore((state) => state.receiverParticipant);
  const senderParticipant = useParticipantStore((state) => state.senderParticipant);
  const messageReply = useMessageStore((state) => state.messageReply);
  const inputFormEl = useMessageStore((state) => state.inputFormEl);
  const conversation = useConversationStore((state) => state.conversation);
  const setMessageReply = useMessageStore((state) => state.setMessageReply);

  const handleToggleVisibleEmoji = useCallback(() => {
    setVisibleEmoji(!visibleEmoji);
  }, [visibleEmoji]);

  const handleEmojiClick = useCallback(
    (emojiData: EmojiClickData) => {
      const inputCurrentValue = form.getFieldValue("content");
      const cursorPositionIndex = inputFormEl.current?.input?.selectionStart;
      const newValue = cursorPositionIndex
        ? inputCurrentValue?.substring(0, cursorPositionIndex) +
          emojiData?.emoji +
          inputCurrentValue?.substring(cursorPositionIndex)
        : inputCurrentValue || "" + emojiData?.emoji;
      form.setFieldValue("content", newValue);
    },
    [form, inputFormEl],
  );

  const handleFinish = useCallback(
    (values: any) => {
      const { content } = values;
      if (!content?.trim()) return;

      if (receiverParticipant?.user?.id && senderParticipant?.id && conversation) {
        const payload: SendMessageType = {
          content,
          conversationId: conversation.id,
          receiverId: receiverParticipant?.user?.id,
          senderParticipantId: senderParticipant?.id,
          replyTo: messageReply,
        };
        socket?.emit(REQUEST_SEND_MESSAGE, payload);
        setMessageReply(undefined);
        form.resetFields();
      }
    },
    [
      conversation,
      form,
      messageReply,
      receiverParticipant?.user?.id,
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

  const handleTyping = (e: KeyboardEvent<HTMLInputElement>) => {
    if (conversation) {
      const payload: ReqTypingMessageType = {
        conversationId: conversation.id,
      };

      if (_isTyping) {
        typingDebounce.current?.cancel();
        typingDebounce.current = _debounce(() => {
          socket?.emit(REQUEST_STOP_TYPING_MESSAGE, payload);
          _setIsTyping(false);
        }, 2000);
        typingDebounce.current();
      } else {
        const validTyping = typingRegex.test(e.key);
        validTyping && _setIsTyping(true);
        validTyping && socket?.emit(REQUEST_TYPING_MESSAGE, payload);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick, false);

    return () => {
      document.removeEventListener("click", handleDocumentClick, false);
      if (conversation) {
        const payload: ReqTypingMessageType = {
          conversationId: conversation?.id,
        };
        socket?.emit(REQUEST_STOP_TYPING_MESSAGE, payload);
      }
    };
  }, [conversation, handleDocumentClick, socket]);

  return {
    inputFormEl,
    visibleEmoji,
    form,
    handleToggleVisibleEmoji,
    handleEmojiClick,
    handleTyping,
    handleFinish,
  };
};

export default useMessageForm;
