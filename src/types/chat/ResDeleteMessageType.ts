import { ConversationType, MessageType, ReqDeleteMessageType } from "@/types";

export type ResDeleteMessageTypeFailure = ReqDeleteMessageType & {
  errorMessage: string;
};

export type ResDeleteMessageType = ReqDeleteMessageType & {
  conversationUpdated?: ConversationType;
  messages: MessageType[];
};
