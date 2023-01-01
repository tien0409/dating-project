import { ConversationType, UserType } from "@/types";

type ResCallAcceptType = {
  acceptor: UserType;
  caller: UserType;
  conversation: ConversationType;
};

export default ResCallAcceptType;
