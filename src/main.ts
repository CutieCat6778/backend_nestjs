import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import dotenv from 'dotenv';

dotenv.config();

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

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  await app.listen(80);
}
bootstrap();
