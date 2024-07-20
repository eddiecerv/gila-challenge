import { Injectable } from '@nestjs/common';
import { PushNotificationEntity } from './dto/push-notification.entity';

@Injectable()
export class PushNotificationService {
  async sendNotification({
    deviceId,
    message,
  }: PushNotificationEntity): Promise<boolean> {
    //Mock send notification
    return await new Promise((res) => {
      setTimeout(() => {
        console.log('Sending Push Notification:', deviceId, message);
        res(true);
      }, 500);
    });
  }
}
