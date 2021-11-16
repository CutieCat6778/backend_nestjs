import { Document } from 'mongoose';

export interface UserDoc extends Document {
  total: number;
  exp: number;
  level: number;
}
