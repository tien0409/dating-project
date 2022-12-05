import { MessageType } from "@/types";

type SendMessageType = {
  conversationId: string;
  senderParticipantId: string;
  receiverParticipantId: string;
  content: string;
  replyTo?: MessageType;
};

export default SendMessageType;
