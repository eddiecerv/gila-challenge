import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as Scheme } from 'mongoose';

@Schema({ collection: 'notifications', timestamps: true })
export class Notification {
  @ApiProperty()
  @Prop({ required: true, type: Scheme.Types.ObjectId, ref: 'Notification' })
  categoryId: string;

  @ApiProperty()
  @Prop({ required: true })
  message: string;

  @ApiProperty()
  @Prop({ required: true, default: new Date() })
  createdAt: Date;

  @ApiProperty()
  @Prop({ required: true, default: new Date() })
  updatedAt: Date;
}

export type NotificationDocument = Notification & Document;
export const NotificationSchema = SchemaFactory.createForClass(Notification);
