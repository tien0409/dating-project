import { MessageType } from "@/types";

type SendMessageType = {
  conversationId: string;
  senderParticipantId: string;
  receiverId: string;
  content: string;
  replyTo?: MessageType;
  attachments?: string[];
};

export default SendMessageType;
