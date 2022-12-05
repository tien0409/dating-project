import { MessageType } from "@/types";

type ReqDeleteMessageType = {
  indexMessageDeleted: number;
  message: MessageType;
  receiverId: string;
  senderParticipantId: string;
  conversationId: string;
};

export default ReqDeleteMessageType;
