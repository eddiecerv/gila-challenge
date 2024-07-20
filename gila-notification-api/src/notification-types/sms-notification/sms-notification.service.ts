import { Injectable } from '@nestjs/common';
import { SmsNotificationEntity } from './dto/sms-notification.entity';

@Injectable()
export class SmsNotificationService {
  async sendNotification({
    phone,
    message,
  }: SmsNotificationEntity): Promise<boolean> {
    //Mock send notification
    return await new Promise((res) => {
      setTimeout(() => {
        console.log('Sending SMS Message:', phone, message);
        res(true);
      }, 500);
    });
  }
}
