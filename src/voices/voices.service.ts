import { VoicesRes } from './../interfaces/res.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAPIRes, VoiceRes } from '../interfaces/res.interface';
import { UserDoc } from '../interfaces/user-doc.interface';
import { getUserData } from '../utils/getUserData';

@Injectable()
export class VoicesService {
  constructor(@InjectModel('Levels') private userModel: Model<UserDoc>) {}

  async getId(id: number | string): Promise<VoiceRes> {
    id = id + '';
    const date = new Date().getTime();
    const data = await this.userModel.findOne({ _id: id }).exec();
    if (data) {
      const UserDataAPI: UserAPIRes = await getUserData(id);
      const UserVoice = {
        voices: data.voice,
        userData: UserDataAPI,
      };
      const timeTook = new Date().getTime() - date;
      return {
        date: UserVoice,
        time: timeTook,
      };
    } else {
      return null;
    }
  }

  async getByDate(
    day?: number,
    month?: number,
    year?: number,
  ): Promise<VoicesRes> {
    try {
      const date1 = new Date();
      const date = new Date();
      !day ? null : date.setDate(day);
      !month ? null : date.setMonth(month - 1);
      !year ? null : date.setFullYear(year);
      const dateStart = new Date(date.setHours(1, 0, 0));
      const dateEnd = new Date(date.setHours(24, 59, 59));
      const users = await this.userModel
        .find({
          voice: {
            $elemMatch: {
              date: {
                $gte: dateStart,
                $lte: dateEnd,
              },
            },
          },
        })
        .exec();

      const results = [];

      for (const user of users) {
        results.push({
          voices: user.voice,
        });
      }
      const timeTook = new Date().getTime() - date1.getTime();
      return users.length > 0 ? { data: results, time: timeTook } : undefined;
    } catch (e) {
      throw e;
    }
  }

  async getWeek(): Promise<VoicesRes> {
    const date = new Date();
    const week = date.getWeek();
    try {
      const dateStart = new Date(week[0]);
      const dateEnd = new Date(week[1]);
      const users = await this.userModel
        .find({
          voice: {
            $elemMatch: {
              date: {
                $gte: dateStart,
                $lte: dateEnd,
              },
            },
          },
        })
        .exec();
      const results = [];

      for (const user of users) {
        results.push({
          voices: user.voice,
        });
      }
      const timeTook = new Date().getTime() - date.getTime();
      return users.length > 0 ? { data: results, time: timeTook } : undefined;
    } catch (e) {
      throw e;
    }
  }
}
