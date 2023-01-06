import { GenderType, PassionType, RelationshipType, UserGenderType, UserPhotoType } from "@/types";

type UserAuthType = Partial<{
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  bio: string;
  email: string;
  gender: GenderType;
  userGender: UserGenderType;
  age: number;
  birthday: string;
  avatar: string;
  photos: UserPhotoType[];
  passions: PassionType[];
  userLikes: string[];
  userDiscards: string[];
  userMatches: string[];
  relationshipType: RelationshipType;
}>;

export default UserAuthType;
