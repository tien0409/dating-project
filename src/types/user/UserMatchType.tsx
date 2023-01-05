import { UserType } from "@/types";

type UserMatchType = {
  id: string;
  userMatched: UserType;
  createdAt: Date;
  updatedAt: Date;
};

export default UserMatchType;
