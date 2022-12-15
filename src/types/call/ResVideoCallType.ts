import { UserAuthType } from "@/types";

type ResVideoCallType = {
  conversationId: string;
  receiverId: string;
  caller: UserAuthType;
};

export default ResVideoCallType;
