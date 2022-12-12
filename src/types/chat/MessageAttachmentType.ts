import { MessageType } from "@/types";

type MessageAttachmentType = {
  id: string;
  link: string;
  message: MessageType;
};

export default MessageAttachmentType;
