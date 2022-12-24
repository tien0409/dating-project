import { ConversationType, UserAuthType } from "@/types";

type UserMatchType = {
  userMatched: UserAuthType;
  conversation: ConversationType;
};

export default UserMatchType;
