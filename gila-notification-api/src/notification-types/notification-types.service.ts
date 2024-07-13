import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  NotificationType,
  NotificationTypeDocument,
} from './schemas/notification-type.schema';
import { CreateNotificationTypeDto } from './dto/create-notification-type.dto';

@Injectable()
export class NotificationTypesService {
  constructor(
    @InjectModel(NotificationType.name)
    private notificationTypeModel: Model<NotificationTypeDocument>,
  ) {}

  async create(
    createNotificationTypeDto: CreateNotificationTypeDto,
  ): Promise<NotificationType> {
    const createdNotificationType = new this.notificationTypeModel(
      createNotificationTypeDto,
    );
    return createdNotificationType.save();
  }

  async findAll(): Promise<NotificationType[]> {
    return this.notificationTypeModel.find().exec();
  }
}
