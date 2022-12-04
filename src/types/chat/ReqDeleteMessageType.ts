import { MessageType } from "@/types";

type ReqDeleteMessageType = {
  indexMessageDeleted: number;
  message: MessageType;
  receiverId: string;
  senderParticipantId: string;
};

export default ReqDeleteMessageType;
