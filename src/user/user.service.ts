import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDoc } from 'src/interfaces/user-doc.interface';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('Levels') private userModel: Model<UserDoc>) {}

  async getAll(): Promise<User[]> {
    const userDocs = await this.userModel.find().exec();
    return userDocs.length > 0
      ? userDocs.map((doc) => ({
          id: doc._id,
          total: doc.total,
          exp: doc.exp,
          level: doc.level,
          voice: doc.voice,
          messages: doc.messages,
          channels: doc.channels,
          server: doc.server,
        }))
      : undefined;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id }).exec();
    return user
      ? {
          id: user._id,
          total: user.total,
          exp: user.exp,
          level: user.level,
          voice: user.voice,
          messages: user.messages,
          server: user.server,
          channels: user.channels,
        }
      : undefined;
  }
}
