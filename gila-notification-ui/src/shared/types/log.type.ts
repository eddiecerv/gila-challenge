import { Notification, NotificationType } from "./notification.type";
import { User } from "./user.type";

export type Log = {
  _id: string;
  notification: Notification;
  notificationType: NotificationType;
  user: User;
  createdAt: string;
  updatedAt: string;
};
