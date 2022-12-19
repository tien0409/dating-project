import { CallType } from "@/types";

type ReqCallInitType = {
  conversationId: string;
  receiverId: string;
  callType: CallType;
};

export default ReqCallInitType;
