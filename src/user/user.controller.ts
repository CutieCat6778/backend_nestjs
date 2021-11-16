import {
  Controller,
  Get,
  Param,
  NotFoundException,
  ParseIntPipe,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { LoggingInterceptor } from '../logging.interceptor';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(LoggingInterceptor)
  @Get('/id/:id')
  async findUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<User> {
    const result = await this.userService.findById(id);
    if (result) {
      console.log(result);
      return result;
    } else {
      throw new NotFoundException();
    }
  }
}
