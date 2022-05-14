/* eslint-disable prettier/prettier */
import { SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { GenerateToken } from 'src/utils/token';

export type SessionDocument = Session & Document;

@Schema()
@ObjectType()
export class Session {
  @Field(() => String)
  _id: string;

  @Prop({ required: true, unique: true, default: GenerateToken() })
  @Field(() => String, { description: "Token" })
  token: string;

  @Prop({ required: true, default: Date.now })
  @Field(() => Number, { description: "Created At" })
  createdAt: number;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
