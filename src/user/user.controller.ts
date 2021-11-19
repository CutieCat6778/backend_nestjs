import { UsersRes, UserRes } from './../interfaces/res.interface';
import {
  Controller,
  Get,
  Param,
  NotFoundException,
  UseInterceptors,
  NotAcceptableException,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { LoggingInterceptor } from '../logging.interceptor';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(LoggingInterceptor)
  @Get('')
  async getAll(): Promise<UsersRes> {
    const result = await this.userService.getAll();
    if (result) {
      return result;
    } else {
      throw new NotFoundException();
    }
  }

  @UseInterceptors(LoggingInterceptor)
  @Get('/id/:id')
  async findUser(
    @Param('id')
    id: string,
  ): Promise<UserRes> {
    if (!id) throw new NotAcceptableException();
    const result = await this.userService.findById(id);
    if (result) {
      return result;
    } else {
      throw new NotFoundException();
    }
  }

  @UseInterceptors(LoggingInterceptor)
  @Get('/day/:day')
  async findDay(
    @Param(
      'day',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    day: number,
  ): Promise<UsersRes> {
    if (!day) throw new NotAcceptableException();
    const result = await this.userService.findByDay(day);
    if (result) {
      return result;
    } else {
      throw new NotFoundException();
    }
  }

  @UseInterceptors(LoggingInterceptor)
  @Get('/*')
  async else() {
    throw new NotFoundException();
  }
}
