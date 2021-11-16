import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  _id: String,
  total: Number,
  exp: Number,
  level: Number,
});
