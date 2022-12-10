import { MessageType, ParticipantType } from "@/types";

type ConversationType = {
  id: string;
  lastMessage?: MessageType;
  participants: ParticipantType[];
};

export default ConversationType;
