import { Form } from "antd";
import { EmojiClickData } from "emoji-picker-react";
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import _debounce from "lodash/debounce";

import {
  useConversationStore,
  useMessageStore,
  useParticipantStore,
  useSocketStore,
} from "@/store";
import { ReqTypingMessageType, ReqUpdateMessageType, SendMessageType } from "@/types";
import {
  REQUEST_SEND_MESSAGE,
  REQUEST_STOP_TYPING_MESSAGE,
  REQUEST_TYPING_MESSAGE,
  REQUEST_UPDATE_MESSAGE,
} from "@/configs/socket-events";
import { typingRegex } from "@/utils/regexes";
import { useUploadMultiImageData } from "@/hooks/useUploadData";
import { convertToFormData } from "@/utils/upload";

const useMessageForm = () => {
  const typingDebounceRef = useRef<any>();
  const fileAttachRef = useRef<HTMLInputElement>(null);

  const [_isTyping, _setIsTyping] = useState(false);

  const [visibleEmoji, setVisibleEmoji] = useState(false);
  const [filesUpload, setFilesUpload] = useState<FileList>();
  const [filesUploadPreview, setFilesUploadPreview] = useState<string[]>([]);

  const [form] = Form.useForm();

  const socket = useSocketStore((store) => store.socket);
  const receiverParticipant = useParticipantStore((state) => state.receiverParticipant);
  const senderParticipant = useParticipantStore((state) => state.senderParticipant);
  const messageReply = useMessageStore((state) => state.messageReply);
  const messageEdit = useMessageStore((state) => state.messageEdit);
  const inputFormEl = useMessageStore((state) => state.inputFormEl);
  const conversation = useConversationStore((state) => state.conversation);
  const setMessageEdit = useMessageStore((state) => state.setMessageEdit);
  const setMessageReply = useMessageStore((state) => state.setMessageReply);

  const { mutateAsync, isLoading: uploadFileLoading } = useUploadMultiImageData();

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

  const doCreate = useCallback(async () => {
    if (conversation && receiverParticipant?.user?.id && senderParticipant?.id) {
      const payload: SendMessageType = {
        content: form.getFieldValue("content"),
        conversationId: conversation.id,
        receiverId: receiverParticipant?.user?.id,
        senderParticipantId: senderParticipant?.id,
        replyTo: messageReply,
      };
      if (filesUpload?.length) {
        const res = await mutateAsync(convertToFormData({ files: Array.from(filesUpload) }));
        payload.attachments = res?.data?.map((item: any) => item.url) || [];
      }
      socket?.emit(REQUEST_SEND_MESSAGE, payload);
      setMessageReply(undefined);
      setFilesUploadPreview([]);
      setFilesUpload(undefined);
    }
  }, [
    conversation,
    filesUpload,
    form,
    messageReply,
    mutateAsync,
    receiverParticipant?.user?.id,
    senderParticipant?.id,
    setMessageReply,
    socket,
  ]);

  const doUpdate = useCallback(() => {
    if (messageEdit && conversation) {
      const payload: ReqUpdateMessageType = {
        messageId: messageEdit.id,
        conversationId: conversation.id,
        content: form.getFieldValue("content"),
      };
      socket?.emit(REQUEST_UPDATE_MESSAGE, payload);
      setMessageEdit(undefined);
    }
  }, [conversation, form, messageEdit, setMessageEdit, socket]);

  const handleFinish = useCallback(
    async (values: any) => {
      const { content } = values;
      if (!content?.trim() && !filesUpload?.length) return;

      messageEdit ? doUpdate() : await doCreate();
      form.resetFields();
      if (fileAttachRef.current) fileAttachRef.current.value = "";
    },
    [doCreate, doUpdate, filesUpload, form, messageEdit],
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
        typingDebounceRef.current?.cancel();
        typingDebounceRef.current = _debounce(() => {
          socket?.emit(REQUEST_STOP_TYPING_MESSAGE, payload);
          _setIsTyping(false);
        }, 2000);
        typingDebounceRef.current();
      } else {
        const validTyping = typingRegex.test(e.key);
        validTyping && _setIsTyping(true);
        validTyping && socket?.emit(REQUEST_TYPING_MESSAGE, payload);
      }
    }
  };

  const handleChooseFile = () => {
    fileAttachRef.current?.click();
  };

  const handleChangeFileAttach = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFilesUpload(e.target.files);
      const filesPreview = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setFilesUploadPreview(filesPreview);
    }
  };

  const handleCancelSendFile = () => {
    setFilesUpload(undefined);
    setFilesUploadPreview([]);
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

  useEffect(() => {
    if (messageEdit) form.setFieldValue("content", "asdasd");
    else form.setFieldValue("content", "");
  }, [form, messageEdit]);

  return {
    inputFormEl,
    fileAttachRef,
    visibleEmoji,
    uploadFileLoading,
    filesUploadPreview,
    filesUpload,
    form,
    handleToggleVisibleEmoji,
    handleEmojiClick,
    handleTyping,
    handleChooseFile,
    handleChangeFileAttach,
    handleCancelSendFile,
    handleFinish,
  };
};

export default useMessageForm;
