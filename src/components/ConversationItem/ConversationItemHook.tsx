import { useCallback, useMemo } from "react";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { FiVideo } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BiBlock } from "react-icons/bi";
import classNames from "classnames/bind";

import styles from "./ConversationItem.module.scss";
import { ConversationItemProps } from ".";
import { useConversationStore, useMessageStore, useSocketStore, useAuthStore } from "@/store";
import { REQUEST_DELETE_CONVERSATION } from "@/configs/socket-events";
import { ReqDeleteConversationType } from "@/types";
import { MESSAGES_ROUTE } from "@/configs/routes";

const cln = classNames.bind(styles);

const useConversationItem = (props: ConversationItemProps) => {
  const { conversation } = props;

  const router = useRouter();

  const profile = useAuthStore((state) => state.profile);
  const socket = useSocketStore((state) => state.socket);
  const conversationIdsTyping = useConversationStore((state) => state.conversationIdsTyping);
  const currentConversation = useConversationStore((state) => state.conversation);
  const conversations = useConversationStore((state) => state.conversations);
  const setMessages = useMessageStore((state) => state.setMessages);
  const setConversations = useConversationStore((state) => state.setConversations);
  const setConversation = useConversationStore((state) => state.setConversation);

  const isReceiverTyping = () =>
    currentConversation && conversationIdsTyping.get(currentConversation?.id);

  const receiverConversation = useMemo(
    () => conversation?.participants?.filter((item) => item?.user?.id !== profile?.id)?.[0],
    [conversation?.participants, profile?.id],
  );

  const doDeleteConversation = useCallback(async () => {
    if (conversation) {
      await router.replace(MESSAGES_ROUTE);

      // delete local
      const newConversations = conversations.filter((item) => item.id !== conversation?.id);
      setConversations(newConversations);
      if (currentConversation?.id === conversation.id) {
        setConversation(undefined);
        setMessages([]);
      }

      const payload: ReqDeleteConversationType = { conversationId: conversation?.id };
      socket?.emit(REQUEST_DELETE_CONVERSATION, payload);
    }
  }, [
    conversation,
    conversations,
    currentConversation?.id,
    router,
    setConversation,
    setConversations,
    setMessages,
    socket,
  ]);

  const handleDeleteConversation = () => {
    Modal.confirm({
      type: "warning",
      title: "This action cannot be undone",
      content: "Are you sure you want to delete this conversation?",
      okText: "Delete",
      onOk: doDeleteConversation,
    });
  };

  const controlOptions = useMemo(
    () => [
      {
        key: "1",
        label: (
          <div className={cln("control__action")}>
            <FiVideo />
            <span>Call video</span>
          </div>
        ),
      },
      {
        key: "2",
        label: (
          <div className={cln("control__action")}>
            <BiBlock />
            <span>Block</span>
          </div>
        ),
      },
      {
        key: "3",
        label: (
          <div className={cln("control__action")} onClick={handleDeleteConversation}>
            <RiDeleteBin2Line />
            <span>Delete</span>
          </div>
        ),
      },
    ],
    [handleDeleteConversation],
  );

  return {
    isReceiverTyping,
    receiverConversation,
    controlOptions,
  };
};

export default useConversationItem;
