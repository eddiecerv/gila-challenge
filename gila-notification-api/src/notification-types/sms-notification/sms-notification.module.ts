import { Module } from '@nestjs/common';
import { SmsNotificationController } from './sms-notification.controller';
import { SmsNotificationService } from './sms-notification.service';

@Module({
  controllers: [SmsNotificationController],
  providers: [SmsNotificationService]
})
export class SmsNotificationModule {}
