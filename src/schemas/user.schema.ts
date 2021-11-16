import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id: string;

  @Prop()
  total: number;

  @Prop()
  exp: number;

  @Prop()
  level: number;
  static _id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
