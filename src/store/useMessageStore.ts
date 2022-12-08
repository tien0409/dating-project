import create from "zustand";
import { createRef, RefObject } from "react";

import { MessageType } from "@/types";
import { InputRef } from "antd";

type MessageStoreType = {
  loadingGetMessages: boolean;
  setLoadingGetMessages: (_loading: boolean) => void;
  inputFormEl: RefObject<InputRef>;
  inputFocus: () => void;
  lastMessageEl: RefObject<HTMLDivElement>;
  scrollToLastMessage: () => void;
  messages: MessageType[];
  setMessages: (_messages: MessageType[]) => void;
  messageReply?: MessageType;
  setMessageReply: (_messageReply?: MessageType) => void;
  messageDelete?: MessageType;
  setMessageDelete: (_messageDelete?: MessageType) => void;
};

const useMessageStore = create<MessageStoreType>((setState, getState) => ({
  loadingGetMessages: false,
  setLoadingGetMessages: (loading) => setState({ loadingGetMessages: loading }),
  inputFormEl: createRef<InputRef>(),
  inputFocus: () => {
    getState()?.inputFormEl.current.focus();
  },
  lastMessageEl: createRef<HTMLDivElement>(),
  scrollToLastMessage: () => {
    setTimeout(() => {
      getState()?.lastMessageEl?.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  },
  messages: [],
  setMessages: (messages) => setState((state) => ({ ...state, messages })),
  messageReply: undefined,
  setMessageReply: (messageReply) => setState((state) => ({ ...state, messageReply })),
  messageDelete: undefined,
  setMessageDelete: (messageDelete) => setState((state) => ({ ...state, messageDelete })),
}));

export default useMessageStore;
