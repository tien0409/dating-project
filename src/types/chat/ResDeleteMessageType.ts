import { MessageType, ReqDeleteMessageType } from "@/types";

export type ResDeleteMessageTypeFailure = ReqDeleteMessageType & {
  errorMessage: string;
};

export type ResDeleteMessageType = ReqDeleteMessageType & {
  messages: MessageType[];
};