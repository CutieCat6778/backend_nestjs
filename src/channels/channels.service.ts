import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ChannelsRes,
  UsersRes,
  ChannelRes,
} from 'src/interfaces/res.interface';
import { UserDoc } from 'src/interfaces/user-doc.interface';

@Injectable()
export class ChannelsService {
  constructor(@InjectModel('Levels') private userModel: Model<UserDoc>) {}

  async getAll(): Promise<ChannelsRes> {
    const currentDate = new Date();
    const rawRes = new Map();
    const datas = await this.userModel.find().exec();
    if (!datas || !datas.length) return undefined;
    for (const data of datas) {
      for (const channel of data.channels) {
        const cn = rawRes.get(channel._id);
        if (cn) {
          cn.push(...channel.times);
        } else {
          cn.set(channel._id, channel.times);
        }
      }
    }
    const results = Array.from(rawRes, ([name, value]) => ({
      id: name,
      times: value,
    }));
    const timeTook = new Date().getTime() - currentDate.getTime();
    return { data: results, time: timeTook };
  }

  async findById(id: string): Promise<ChannelRes> {
    const currentDate = new Date();
    const results = [];
    const datas = await this.userModel.find().exec();
    if (!datas || !datas.length) return undefined;
    for (const data of datas) {
      const channel = data.channels.find((a) => a._id == id);
      channel ? results.push(...channel.times) : null;
    }
    const timeTook = new Date().getTime() - currentDate.getTime();
    return { data: results, time: timeTook };
  }

  async findByDay(day: number): Promise<ChannelsRes> {
    const currentDate = new Date();
    const results = [];
    const datas = await this.userModel.find().exec();
    if (!datas || !datas.length) return undefined;
    for (const a of datas) {
      if (a.channels) {
        for (const channel of a.channels) {
          for (const time of channel.times) {
            const date = new Date(time);
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
    }
    const timeTook = new Date().getTime() - currentDate.getTime();
    return { data: results, time: timeTook };
  }

  async findByDays(days: number[]): Promise<UsersRes> {
    const currentDate = new Date();
    const results = [];
    const datas = await this.userModel.find().exec();
    if (!datas || !datas.length) return undefined;
    for (const a of datas) {
      if (a.channels) {
        for (const channel of a.channels) {
          for (const time of channel.times) {
            const date = new Date(time);
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
    }
    const timeTook = new Date().getTime() - currentDate.getTime();
    return { data: results, time: timeTook };
  }

  async topChannels(): Promise<ChannelsRes> {
    const currentDate = new Date();
    const rawRes = new Map();
    const datas = await this.userModel.find().exec();
    if (!datas || !datas.length) return undefined;
    for (const data of datas) {
      for (const channel of data.channels) {
        const cn = rawRes.get(channel._id);
        if (cn) {
          cn.push(...channel.times);
        } else {
          cn.set(channel._id, channel.times);
        }
      }
    }
    const results = Array.from(rawRes, ([name, value]) => ({
      id: name,
      times: value,
    }));
    results.sort((a, b) => {
      if (a.times.length < b.times.length) return 1;
      if (a.times.length > b.times.length) return -1;
      return 0;
    });
    const timeTook = new Date().getTime() - currentDate.getTime();
    return { data: results, time: timeTook };
  }
}
