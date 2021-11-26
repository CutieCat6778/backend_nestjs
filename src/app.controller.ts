import {
  Controller,
  Get,
  HttpCode,
  NotAcceptableException,
} from '@nestjs/common';
import { AppService } from './app.service';

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
