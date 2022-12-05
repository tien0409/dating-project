import { ParticipantType } from "@/types";

type MessageType = {
  id: string;
  content: string;
  participant: ParticipantType;
  conversationUpdated: string;
  active: boolean;
  replyTo?: MessageType;
  createdAt: Date;
  updatedAt: Date;
};

export default MessageType;
