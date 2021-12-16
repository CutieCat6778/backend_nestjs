import { getUserData } from '../utils/getUserData';
import { UserAPIRes } from './../interfaces/res.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRes } from 'src/interfaces/res.interface';
import { UserDoc } from 'src/interfaces/user-doc.interface';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('Levels') private userModel: Model<UserDoc>) {}
  async findById(id: string): Promise<UserRes> {
    try {
      const currentDate = new Date();
      const user = await this.userModel.findOne({ _id: id }).exec();
      if (!user) return undefined;
      const userData: UserAPIRes = await getUserData(id);
      const results: User = {
        id: user._id,
        details: userData,
        total: user.total,
        exp: user.exp,
        level: user.level,
        voice: user.voice,
        messages: user.messages,
        server: user.server,
        channels: user.channels,
        updates: user.updates,
      };
      const timeTook = new Date().getTime() - currentDate.getTime();
      return { data: results, time: timeTook };
    } catch (e) {
      console.error(e);
      return { data: e, time: 0 };
    }
  }
}
