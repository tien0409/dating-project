import { ParticipantType } from "@/types";

type MessageType = {
  id: string;
  content: string;
  participant: ParticipantType;
  conversationUpdated: string;
  createdAt: Date;
  updatedAt: Date;
  replyTo?: MessageType;
};

export default MessageType;
