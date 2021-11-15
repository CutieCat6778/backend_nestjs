import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('greetings')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':name')
  getHelloUser(@Param('name') name: string): string {
    return this.appService.getHelloUser(name);
  }
}
