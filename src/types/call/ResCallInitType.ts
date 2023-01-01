import { CallType, UserType } from "@/types";

type ResCallInitType = {
  conversationId: string;
  receiverId: string;
  caller: UserType;
  callType: CallType;
};

export default ResCallInitType;
