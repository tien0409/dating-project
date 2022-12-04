import { GenderType } from "@/types";

type UserAuthType = Partial<{
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  bio: string;
  email: string;
  gender: GenderType;
  age: number;
  avatar: string;
}>;

export default UserAuthType;
