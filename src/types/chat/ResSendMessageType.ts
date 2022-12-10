import { ConversationType, MessageType } from "@/types";

type ResSendMessageType = {
  conversationUpdated: ConversationType;
  message: MessageType;
};

export default ResSendMessageType;
