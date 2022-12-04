import { MessageType } from "@/types";

type ReqDeleteMessageType = {
  indexMessageDeleted: number;
  message: MessageType;
  receiverId: string;
};

export default ReqDeleteMessageType;
