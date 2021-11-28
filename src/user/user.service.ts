import { UserAPIRes } from './../interfaces/res.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRes, UsersRes } from 'src/interfaces/res.interface';
import { UserDoc } from 'src/interfaces/user-doc.interface';
import { User } from 'src/interfaces/user.interface';
import { getUserData } from 'src/utils/getUserData';

@Injectable()
export class UserService {
  constructor(@InjectModel('Levels') private userModel: Model<UserDoc>) {}

  async getAll(): Promise<UsersRes> {
    try {
      const currentDate = new Date();
      const userDocs = await this.userModel.find().exec();
      const results = userDocs.map((doc) => ({
        id: doc._id,
        total: doc.total,
        exp: doc.exp,
        level: doc.level,
        voice: doc.voice,
        messages: doc.messages,
        channels: doc.channels,
        server: doc.server,
        updates: doc.updates,
      }));
      const timeTook = new Date().getTime() - currentDate.getTime();
      return userDocs.length > 0
        ? { data: results, time: timeTook }
        : undefined;
    } catch (e) {
      console.error(e);
      return { data: e, time: 0 };
    }
  }

  async findById(id: string): Promise<UserRes> {
    try {
      const currentDate = new Date();
      const userData: UserAPIRes = await getUserData(id);
      const user = await this.userModel.findOne({ _id: id }).exec();
      if (!user) return undefined;
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

  async findByDay(day: number): Promise<UsersRes> {
    try {
      const currentDate = new Date();
      const results = [];
      const datas = await this.userModel.find().exec();
      if (!datas || !datas.length) return undefined;
      for (const a of datas) {
        if (a.updates) {
          for (const update of a.updates) {
            const date = new Date(update);
            if (
              date.getFullYear() == currentDate.getFullYear() &&
              date.getMonth() == currentDate.getMonth() &&
              date.getDate() == day
            ) {
              results.find((user) => user.id === a.id) ? null : results.push(a);
            }
          }
        }
      }
      const timeTook = new Date().getTime() - currentDate.getTime();
      return { data: results, time: timeTook };
    } catch (e) {
      console.error(e);
      return { data: e, time: 0 };
    }
  }

  async findByDays(days: number[]): Promise<UsersRes> {
    try {
      const currentDate = new Date();
      const results = [];
      const datas = await this.userModel.find().exec();
      if (!datas || !datas.length) return undefined;
      for (const a of datas) {
        if (a.updates) {
          for (const update of a.updates) {
            const date = new Date(update);
            if (
              date.getFullYear() == currentDate.getFullYear() &&
              date.getMonth() == currentDate.getMonth() &&
              days.includes(date.getDate())
            ) {
              results.find((user) => user.id === a.id) ? null : results.push(a);
            }
          }
        }
      }
      const timeTook = new Date().getTime() - currentDate.getTime();
      return { data: results, time: timeTook };
    } catch (e) {
      console.error(e);
      return { data: e, time: 0 };
    }
  }
}
