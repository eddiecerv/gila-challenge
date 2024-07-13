import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Notification,
  NotificationDocument,
} from './schemas/notification.schema';
import { Model } from 'mongoose';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>,
  ) {}

  async create(data: CreateNotificationDto): Promise<Notification> {
    const newLog = new this.notificationModel(data);
    return newLog.save();
  }

  async findAll(): Promise<Notification[]> {
    return this.notificationModel.find().exec();
  }
}
