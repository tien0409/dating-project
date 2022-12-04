import { MessageType, ParticipantType } from "@/types";

type ConversationType = {
  id: string;
  lastMessage?: MessageType;
  participant: ParticipantType;
};

export default ConversationType;
