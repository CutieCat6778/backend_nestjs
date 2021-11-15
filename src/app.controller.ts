import { Controller, Get, NotAcceptableException, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const result = this.appService.getHello();
    if (result) {
      return result;
    } else {
      throw new NotAcceptableException();
    }
  }

  @Get(':name')
  getHelloUser(@Param('name') name: string): string {
    const result = this.appService.getHelloUser(name);
    if (result) {
      return result;
    } else {
      throw new NotAcceptableException();
    }
  }
}
