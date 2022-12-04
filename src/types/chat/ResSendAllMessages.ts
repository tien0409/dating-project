import { MessageType, ParticipantType } from "@/types";

type ResSendAllMessages = {
  senderParticipant: ParticipantType;
  receiverParticipant: ParticipantType;
  messages: MessageType[];
};

export default ResSendAllMessages;
