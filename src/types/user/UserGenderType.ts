import { GenderType, UserType } from "@/types";

type UserGenderType = {
  id?: string;
  user?: UserType;
  describe?: string;
  isPrivacy: boolean;
  showMeInSearchesAs?: GenderType;
};

export default UserGenderType;
