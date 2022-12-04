import { UserAuthType } from "@/types";

type ParticipantType = {
  id: string;
  timeJoined: Date;
  user: UserAuthType;
};

export default ParticipantType;
