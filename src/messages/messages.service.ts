import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDoc } from 'src/interfaces/user-doc.interface';

declare global {
  interface Date {
    getWeek(start?: number): [Date, Date];
  }
}

Date.prototype.getWeek = function (start: number) {
  start = start || 0;
  const today = new Date(this.setHours(0, 0, 0, 0));
  const day = today.getDay() - start;
  const date = today.getDate() - day;

  const StartDate = new Date(today.setDate(date));
  const EndDate = new Date(today.setDate(date + 6));
  return [StartDate, EndDate];
};

@Injectable()
export class MessagesService {
  constructor(@InjectModel('Levels') private userModel: Model<UserDoc>) {}

  resolveDay(day: number, month: number, year: number): Date {
    const date = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    return date;
  }

  async getDay(day?: number, month?: number, year?: number): Promise<any> {
    try {
      const date1 = new Date();
      const date = new Date();
      !day ? null : date.setDate(day);
      !month ? null : date.setMonth(month - 1);
      !year ? null : date.setFullYear(year);
      const dateStart = new Date(date.setHours(1, 0, 0));
      const dateEnd = new Date(date.setHours(24, 59, 59));
      console.log(dateStart, dateEnd);
      const users = await this.userModel
        .find({
          updates: {
            $gte: dateStart,
            $lte: dateEnd,
          },
        })
        .exec();
      const results = users.map((a) => ({
        id: a._id,
        time: a.updates.find((b) => b >= dateStart && b <= dateEnd),
      }));
      const timeTook = new Date().getTime() - date1.getTime();
      return users.length > 0 ? { data: results, time: timeTook } : undefined;
    } catch (e) {
      throw e;
    }
  }

  async getWeek(): Promise<any> {
    const date = new Date();
    const week = date.getWeek();
    console.log(week);
    try {
      const dateStart = new Date(week[0].setHours(0, 0, 0));
      const dateEnd = new Date(week[1].setHours(23, 59, 59));
      console.log(dateStart, dateEnd);
      const users = await this.userModel
        .find({
          updates: {
            $gte: dateStart,
            $lte: dateEnd,
          },
        })
        .exec();
      const results = users.map((a) => ({
        id: a._id,
        time: a.updates.find((b) => b >= dateStart && b <= dateEnd),
      }));
      const timeTook = new Date().getTime() - date.getTime();
      return users.length > 0 ? { data: results, time: timeTook } : undefined;
    } catch (e) {
      throw e;
    }
  }
}
