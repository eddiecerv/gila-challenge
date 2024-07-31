import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as Scheme } from 'mongoose';

@Schema({ collection: 'logs', timestamps: true })
export class Log {
  @ApiProperty()
  @Prop({ required: true, type: Scheme.Types.ObjectId, ref: 'Notification' })
  notification: string;

  @ApiProperty()
  @Prop({ required: true, type: Scheme.Types.ObjectId, ref: 'User' })
  user: string;

  @ApiProperty()
  @Prop({
    required: true,
    type: Scheme.Types.ObjectId,
    ref: 'NotificationType',
  })
  notificationType: string;

  @ApiProperty()
  @Prop({ required: true, default: new Date() })
  createdAt: Date;

  @ApiProperty()
  @Prop({ required: true, default: new Date() })
  updatedAt: Date;
}

export type LogDocument = Log & Document;
export const LogSchema = SchemaFactory.createForClass(Log);
