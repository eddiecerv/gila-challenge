import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Log, LogDocument } from './schemas/log.schema';
import { Model } from 'mongoose';
import { CreateLogDto } from './dto/create-log.dto';

@Injectable()
export class LogsService {
  constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {}

  async create(data: CreateLogDto): Promise<Log> {
    const newLog = new this.logModel(data);
    return newLog.save();
  }

  async findAll(): Promise<Log[]> {
    return this.logModel
      .find()
      .populate('user')
      .populate('notification')
      .populate('notificationType')
      .sort({
        createdAt: 'desc',
      })
      .exec();
  }

  async findOne(id: string): Promise<Log> {
    return this.logModel
      .findById(id)
      .populate('user')
      .populate('notification')
      .populate('notificationType')
      .sort({
        createdAt: 'desc',
      })
      .exec();
  }
}
