import {
  Controller,
  Get,
  Param,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { LoggingInterceptor } from '../logging.interceptor';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(LoggingInterceptor)
  @Get('')
  async getAll(): Promise<User[]> {
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
  ): Promise<User> {
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
    @Param('day')
    day: number,
  ): Promise<User[]> {
    const result = await this.userService.findByDay(day);
    if (result) {
      return result;
    } else {
      throw new NotFoundException();
    }
  }
}
