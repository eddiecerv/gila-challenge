import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { NotificationTypesService } from './notification-types.service';
import { CreateNotificationTypeDto } from './dto/create-notification-type.dto';
import { NotificationType } from './schemas/notification-type.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('notification-types')
@Controller('notification-types')
@UseGuards(JwtAuthGuard)
export class NotificationTypesController {
  constructor(
    private readonly notificationTypesService: NotificationTypesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new notification type' })
  @ApiCreatedResponse({
    description: 'The notification type has been successfully created.',
    type: NotificationType,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data.' })
  async create(@Body() createNotificationTypeDto: CreateNotificationTypeDto) {
    return this.notificationTypesService.create(createNotificationTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notification types' })
  @ApiOkResponse({
    description: 'List of all notification types',
    type: [NotificationType],
  })
  async findAll() {
    return this.notificationTypesService.findAll();
  }
}
