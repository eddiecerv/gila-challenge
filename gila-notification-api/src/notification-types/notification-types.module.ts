import { Module } from '@nestjs/common';
import { NotificationTypesService } from './notification-types.service';
import { NotificationTypesController } from './notification-types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NotificationType,
  NotificationTypeSchema,
} from './schemas/notification-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NotificationType.name, schema: NotificationTypeSchema },
    ]),
  ],
  providers: [NotificationTypesService],
  controllers: [NotificationTypesController],
  exports: [NotificationTypesService],
})
export class NotificationTypesModule {}
