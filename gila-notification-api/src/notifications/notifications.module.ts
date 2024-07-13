import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Notification,
  NotificationSchema,
} from './schemas/notification.schema';
import { UsersService } from 'src/users/users.service';
import { CategoriesService } from 'src/categories/categories.service';
import { NotificationTypesService } from 'src/notification-types/notification-types.service';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import {
  Category,
  CategorySchema,
} from 'src/categories/schemas/category.schema';
import {
  NotificationType,
  NotificationTypeSchema,
} from 'src/notification-types/schemas/notification-type.schema';
import { LogsService } from 'src/logs/logs.service';
import { Log, LogSchema } from 'src/logs/schemas/log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: User.name, schema: UserSchema },
      { name: Category.name, schema: CategorySchema },
      { name: NotificationType.name, schema: NotificationTypeSchema },
      { name: Log.name, schema: LogSchema },
    ]),
  ],
  providers: [
    NotificationsService,
    UsersService,
    CategoriesService,
    NotificationTypesService,
    LogsService,
  ],
  controllers: [NotificationsController],
  exports: [NotificationsService],
})
export class NotificationsModule {}
