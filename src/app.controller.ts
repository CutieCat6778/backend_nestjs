import {
  Controller,
  Get,
  HttpCode,
  NotAcceptableException,
} from '@nestjs/common';
import { AppService } from './app.service';

declare global {
  interface Date {
    getWeek(start?: number): [Date, Date];
  }
}

Date.prototype.getWeek = function (start: number) {
  start = start || 0;
  const today = new Date(this.setHours(1, 0, 0, 0));
  const day = today.getDay() - start;
  const date = today.getDate() - day;

  const StartDate = new Date(today.setDate(date));
  const EndDate = new Date(today.setDate(date + 6));
  return [StartDate, EndDate];
};

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  getHello() {
    const result = this.appService.returnOk();
    if (result) {
      return result;
    } else {
      throw new NotAcceptableException();
    }
  }
}
