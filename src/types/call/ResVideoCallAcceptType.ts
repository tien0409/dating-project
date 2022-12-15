import { ConversationType, UserAuthType } from "@/types";

type ResVideoCallAcceptType = {
  acceptor: UserAuthType;
  caller: UserAuthType;
  conversation: ConversationType;
};

export default ResVideoCallAcceptType;
