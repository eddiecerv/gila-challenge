import { Injectable } from '@nestjs/common';
import { EmailNotificationEntity } from './dto/email-notification.entity';

@Injectable()
export class EmailNotificationService {
  async sendNotification({
    email,
    message,
  }: EmailNotificationEntity): Promise<boolean> {
    //Mock send notification
    return await new Promise((res) => {
      setTimeout(() => {
        console.log('Sending Email:', email, message);
        res(true);
      }, 500);
    });
  }
}
