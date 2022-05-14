/* eslint-disable prettier/prettier */
import { SchemaFactory } from '@nestjs/mongoose';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@ObjectType() 
export class UserSecure {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String, { description: "Username" })
  username: string;

  @Prop({ required: true })
  @Field(() => String, { description: "User's email address" })
  email: string;

  @Prop({ required: true, default: [] })
  @Field(() => Tables, { description: "User's todo tables" })
  tables: Tables[];

  @Prop({ required: true, default: Date.now })
  @Field(() => Date, { description: "Creation date" })
  createdAt: Date;
}
@Schema()
@ObjectType()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String, { description: "Username" })
  username: string;

  @Prop({ required: true })
  @Field(() => String, { description: "User's password" })
  password: string;

  @Prop({ required: true })
  @Field(() => String, { description: "User's email address" })
  email: string;

  @Prop({ required: true, default: [] })
  @Field(() => Tables, { description: "User's todo tables" })
  tables: Tables[];

  @Prop({ required: true, default: Date.now })
  @Field(() => Date, { description: "Creation date" })
  createdAt: Date;
}

@Schema()
@ObjectType()

class Columns {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String, { description: "Content" })
  content: string;

  @Prop({ required: true, default: { $inc: { seq: 1 } } })
  @Field(() => Number, { description: "Column's position" })
  position: number;

  @Prop({ required: true, default: Date.now })
  @Field(() => Date, { description: "Creation Date" })
  createdAt: Date;
}

@Schema()
@ObjectType()

class Tables {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String, { description: "Content" })

  title: string;

  @Prop({ required: true, default: 0 })
  @Field(() => String, { description: "Type" })
  type: number;

  @Prop({ required: true, default: [] })
  @Field(() => Columns, { description: "Columns array" })
  columns: Columns[];

  @Prop({ required: true, default: { $inc: { seq: 1 } } })
  @Field(() => Number, { description: "Table's position" })
  position: number;

  @Prop({ required: true, default: Date.now })
  @Field(() => Date, { description: "Creation Date" })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);