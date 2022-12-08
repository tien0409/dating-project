import { MessageType } from "@/types";

type ResUpdateMessageType = {
  message: MessageType;
  conversationId?: string;
};

export default ResUpdateMessageType;
