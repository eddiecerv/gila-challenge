import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema({ collection: 'notification-types' })
export class NotificationType {
  @ApiProperty()
  @Prop()
  id: string;

  @ApiProperty()
  @Prop({ required: true, unique: true })
  tag: string;

  @ApiProperty()
  @Prop({ required: true })
  name: string;
}

export type NotificationTypeDocument = NotificationType & Document;
export const NotificationTypeSchema =
  SchemaFactory.createForClass(NotificationType);
