import { MessageType } from "@/types";

type ResponseSendMessageType = {
  conversationIdUpdated: string;
  message: MessageType;
};

export default ResponseSendMessageType;
