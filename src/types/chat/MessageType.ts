import { ParticipantType } from "@/types";

type MessageType = Partial<{
  id: string;
  content: string;
  participant: ParticipantType;
  conversationUpdated: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export default MessageType;
