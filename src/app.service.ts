import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  returnOk() {
    return HttpStatus.OK;
  }
}
