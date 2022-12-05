import { ConversationType, MessageType, ParticipantType } from "@/types";

type ResSendAllMessages = {
  conversation: ConversationType;
  senderParticipant: ParticipantType;
  receiverParticipant: ParticipantType;
  messages: MessageType[];
};

export default ResSendAllMessages;
