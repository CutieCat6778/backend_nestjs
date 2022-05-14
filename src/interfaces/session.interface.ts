import { Schema as MongooseSchema } from 'mongoose';

export interface Session {
  _id: MongooseSchema.Types.ObjectId;
  token: string;
  createdAt: number;
}
