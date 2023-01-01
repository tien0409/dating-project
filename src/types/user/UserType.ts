import { GenderType, PassionType, UserPhotoType } from "@/types";

type UserType = Partial<{
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  bio: string;
  email: string;
  gender: GenderType;
  age: number;
  avatar: string;
  photos: UserPhotoType[];
  passions: PassionType[];
}>;

export default UserType;
