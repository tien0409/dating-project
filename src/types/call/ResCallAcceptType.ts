import { ConversationType, UserAuthType } from "@/types";

type ResCallAcceptType = {
  acceptor: UserAuthType;
  caller: UserAuthType;
  conversation: ConversationType;
};

export default ResCallAcceptType;
