import { MessageType, ParticipantType } from "@/types";

type ResponseSendAllMessages = {
  senderParticipant: ParticipantType;
  receiverParticipant: ParticipantType;
  messages: MessageType[];
};

export default ResponseSendAllMessages;
