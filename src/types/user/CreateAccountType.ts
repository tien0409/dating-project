import { GenderType, UserGenderType } from "@/types";

type CreateAccountType = {
  firstName: string;
  lastName: string;
  birthday: Date;
  userPhotos: string[];
  bio?: string;
  userGender: UserGenderType;
  interestedInGender: GenderType;
};

export default CreateAccountType;
