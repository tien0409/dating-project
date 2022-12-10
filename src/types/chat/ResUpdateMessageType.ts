import { ConversationType, MessageType } from "@/types";

type ResUpdateMessageType = {
  message: MessageType;
  conversationUpdated?: ConversationType;
};

export default ResUpdateMessageType;
