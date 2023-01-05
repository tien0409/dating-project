import { UserType } from "@/types";

type NotificationType = {
  id: string;
  type: "SYSTEM" | "MATCHED" | "PAYMENT";
  sender?: UserType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export default NotificationType;
