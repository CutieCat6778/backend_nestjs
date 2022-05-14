import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get('/')
  returnOk() {
    return {
      status: 200,
      message: 'Hello world',
    };
  }
}
