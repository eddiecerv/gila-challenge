import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UsersService } from 'src/users/users.service';
import { CategoriesService } from 'src/categories/categories.service';
import { LogsService } from 'src/logs/logs.service';
import { NotificationTypesService } from 'src/notification-types/notification-types.service';

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
        user.channels.forEach(async (channel) => {
          const resultLog = await this.logsService.create({
            notification: newNotification._id,
            notificationType: channels.find((c) => c.tag === channel)._id,
            user: user.id,
          });

          logs.push(resultLog);
        });
      }
    }

    return this.logsService.findAll();
  }

  @Get()
  @ApiOperation({ summary: 'Get all notification' })
  async findAll() {
    return this.notificationsService.findAll();
  }
}
