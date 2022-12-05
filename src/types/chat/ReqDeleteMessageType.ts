import { ConversationType, MessageType } from "@/types";

type ReqDeleteMessageType = {
  messageId: string;
  receiverId: string;
  senderParticipantId: string;
  conversation: ConversationType;
};

export default ReqDeleteMessageType;
