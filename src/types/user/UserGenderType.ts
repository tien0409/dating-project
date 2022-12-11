import { GenderType, UserAuthType } from "@/types";

type UserGenderType = {
  id?: string;
  user?: UserAuthType;
  describe?: string;
  isPrivacy: boolean;
  showMeInSearchesAs?: GenderType;
};

export default UserGenderType;
