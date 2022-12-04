import { MessageType } from "@/types";

type ResSendMessageType = {
  conversationIdUpdated: string;
  message: MessageType;
};

export default ResSendMessageType;
