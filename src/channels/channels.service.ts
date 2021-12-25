import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChannelsRes, UsersRes, ChannelRes } from '../interfaces/res.interface';
import { UserDoc } from '../interfaces/user-doc.interface';
import ChannelsData from '../../asset/channels.json';
@Injectable()
export class ChannelsService {
  constructor(@InjectModel('Levels') private userModel: Model<UserDoc>) {}

  async findById(id: string): Promise<ChannelRes> {
    const currentDate = new Date();
    const datas = await this.userModel.find({ 'channels._id': id }).exec();
    if (!datas || !datas.length) return undefined;
    const info = ChannelsData.find((a) => a.id == id);
    const timeTook = new Date().getTime() - currentDate.getTime();
    const times = [];
    datas.map((a) => times.push(...a.channels.find((a) => a._id).times));
    return datas.length > 0
      ? {
          data: {
            times,
            ...info,
          },
          time: timeTook,
        }
      : undefined;
  }

  async findByDay(
    day: number,
    month?: number,
    year?: number,
  ): Promise<ChannelsRes> {
    const currentDate = new Date();
    const results = [];
    const date = new Date();
    !day ? null : date.setDate(day);
    !month ? null : date.setMonth(month - 1);
    !year ? null : date.setFullYear(year);
    const dateStart = new Date(date.setHours(1, 0, 0));
    const dateEnd = new Date(date.setHours(24, 59, 59));
    const datas = await this.userModel
      .find({
        updates: {
          $gte: dateStart,
          $lte: dateEnd,
        },
      })
      .exec();
    if (!datas || !datas.length) return undefined;
    for (const a of datas) {
      for (const channel of a.channels) {
        for (const time of channel.times) {
          const date = new Date(time);
          if (
            date.getFullYear() == year
              ? year
              : currentDate.getFullYear() && date.getMonth() == month
              ? month
              : currentDate.getMonth() && date.getDate() == day
          ) {
            results.find((id) => id === channel._id)
              ? null
              : results.push(channel._id);
          }
        }
      }
    }
    const timeTook = new Date().getTime() - currentDate.getTime();
    return datas.length > 0 ? { data: results, time: timeTook } : undefined;
  }

  async findByDays(
    day: number[],
    month?: number,
    year?: number,
  ): Promise<UsersRes> {
    const currentDate = new Date();
    const results = [];
    const date = new Date();
    !day ? null : date.setDate(Math.min(...day));
    !month ? null : date.setMonth(month - 1);
    !year ? null : date.setFullYear(year);
    const dateStart = new Date(date.setHours(1, 0, 0));
    const dateEnd = new Date(date.setDate(Math.max(...day) + 1));
    const datas = await this.userModel
      .find({
        updates: {
          $gte: dateStart,
          $lte: dateEnd,
        },
      })
      .exec();
    if (!datas || !datas.length) return undefined;
    for (const a of datas) {
      for (const channel of a.channels) {
        for (const time of channel.times) {
          const date = new Date(time);
          if (
            (date.getFullYear() == currentDate.getFullYear() || year) &&
            (date.getMonth() == currentDate.getMonth() || month) &&
            day.includes(date.getDate())
          ) {
            results.find((id) => id === channel._id)
              ? null
              : results.push(channel._id);
          }
        }
      }
    }
    const timeTook = new Date().getTime() - currentDate.getTime();
    return datas.length > 0 ? { data: results, time: timeTook } : undefined;
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
    const results = Array.from(rawRes, ([name, value]) => {
      const data = ChannelsData.find((a) => a.id == name);
      return {
        times: value,
        ...data,
      };
    });
    results.sort((a, b) => {
      if (a.times.length < b.times.length) return 1;
      if (a.times.length > b.times.length) return -1;
      return 0;
    });
    const timeTook = new Date().getTime() - currentDate.getTime();
    return datas.length > 0 ? { data: results, time: timeTook } : undefined;
  }
}
