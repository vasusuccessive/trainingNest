import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: [] })
  comments: { text: string; author: string }[];

  @Prop()
  likes: string;

  @Prop()
  by: string;

  @Prop()
  timeStamp: string;
}


export const BlogSchema = SchemaFactory.createForClass(Blog);
