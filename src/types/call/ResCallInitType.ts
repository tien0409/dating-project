import { CallType, UserAuthType } from "@/types";

type ResCallInitType = {
  conversationId: string;
  receiverId: string;
  caller: UserAuthType;
  callType: CallType;
};

export default ResCallInitType;
