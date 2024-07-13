import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Category {
  @ApiProperty()
  @Prop({ required: true, unique: true })
  tag: string;

  @ApiProperty()
  @Prop({ required: true })
  name: string;
}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
