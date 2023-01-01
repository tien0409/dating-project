import { UserType } from "@/types";

type ParticipantType = {
  id: string;
  timeJoined: Date;
  user: UserType;
};

export default ParticipantType;
