import { MessageAttachmentType, ParticipantType } from "@/types";

type MessageType = {
  id: string;
  content: string;
  participant: ParticipantType;
  conversationUpdated: string;
  active: boolean;
  replyTo?: MessageType;
  createdAt: Date;
  updatedAt: Date;
  attachments?: MessageAttachmentType[];
};

export default MessageType;
