import { Moment } from "moment";

import { UserGenderType } from "@/types";

type UpdateBasicInfo = {
  firstName?: string;
  lastName?: string;
  birthday?: Moment;
  userGender?: UserGenderType;
};

export default UpdateBasicInfo;
