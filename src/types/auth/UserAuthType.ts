import {GenderType} from "@/types";

type UserAuthType = {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  bio?: string;
  email?: string;
  gender?: GenderType;

};

export default UserAuthType;
