import { Module } from '@nestjs/common';
import { NotificationTypesService } from './notification-types.service';
import { NotificationTypesController } from './notification-types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NotificationType,
  NotificationTypeSchema,
} from './schemas/notification-type.schema';
import { PushNotificationModule } from './push-notification/push-notification.module';
import { SmsNotificationModule } from './sms-notification/sms-notification.module';
import { EmailNotificationModule } from './email-notification/email-notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NotificationType.name, schema: NotificationTypeSchema },
    ]),
    PushNotificationModule,
    SmsNotificationModule,
    EmailNotificationModule,
  ],
  providers: [NotificationTypesService],
  controllers: [NotificationTypesController],
  exports: [NotificationTypesService],
})
export class NotificationTypesModule {}
