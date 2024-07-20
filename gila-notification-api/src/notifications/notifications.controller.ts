import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UsersService } from 'src/users/users.service';
import { CategoriesService } from 'src/categories/categories.service';
import { LogsService } from 'src/logs/logs.service';
import { NotificationTypesService } from 'src/notification-types/notification-types.service';
import { Channel } from 'src/notification-types/enums/channels.enum';
import { EmailNotificationService } from 'src/notification-types/email-notification/email-notification.service';
import { PushNotificationService } from 'src/notification-types/push-notification/push-notification.service';
import { SmsNotificationService } from 'src/notification-types/sms-notification/sms-notification.service';

@ApiTags('notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly notificationsTypesService: NotificationTypesService,
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
    private readonly logsService: LogsService,
    private readonly emailNotificationService: EmailNotificationService,
    private readonly pushNotificationService: PushNotificationService,
    private readonly smsNotificationService: SmsNotificationService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new nofication' })
  async create(@Body() data: CreateNotificationDto) {
    const newNotification: any = await this.notificationsService.create(data);
    const logs = [];

    if (newNotification) {
      const users = await this.usersService.findAll();
      const channels: any = await this.notificationsTypesService.findAll();
      const categoryTag = await this.categoriesService.findOne(
        newNotification.categoryId,
      );

      const suscribedUsers = users.filter((u) =>
        u.subscribed.includes(categoryTag.tag),
      );

      // Create a new notification for each Channel
      for await (const user of suscribedUsers) {
        for await (const channel of user.channels) {
          const resultLog: any = await this.logsService.create({
            notification: newNotification._id,
            notificationType: channels.find((c) => c.tag === channel)._id,
            user: user.id,
          });

          // NOTE:
          /**
           * There are 2 approaches for notifications sending.
           * 1. Use await to wait for all notifications to be sent, but
           * if there are 1M suscriptions there will be a lot of
           * time to wait in UI to finish.
           * 2. Send notifications synchronously to avoid the user to wait
           * until finish all sending (This is the used approach).
           *
           * Recommendation: Separate using Microservices for notifications.
           */

          // Send notification
          if (channel === Channel.EMAIL) {
            this.emailNotificationService.sendNotification({
              email: user.email,
              message: data.message,
            });
          } else if (channel === Channel.PUSH) {
            this.pushNotificationService.sendNotification({
              deviceId: user.phone,
              message: data.message,
            });
          } else {
            this.smsNotificationService.sendNotification({
              phone: user.phone,
              message: data.message,
            });
          }

          const log = await this.logsService.findOne(resultLog._id);
          logs.push(log);
        }
      }

      return logs;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all notification' })
  async findAll() {
    return this.notificationsService.findAll();
  }
}
