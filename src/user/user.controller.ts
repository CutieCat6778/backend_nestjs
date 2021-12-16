import { UserRes } from './../interfaces/res.interface';
import {
  Controller,
  Get,
  Param,
  NotFoundException,
  UseInterceptors,
  NotAcceptableException,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoggingInterceptor } from '../logging.interceptor';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(LoggingInterceptor)
  @Get('/:id')
  async findUser(
    @Param('id')
    id: string,
  ): Promise<UserRes> {
    if (!id) throw new NotAcceptableException();
    const result = await this.userService.findById(id);
    if (result) {
      if (result.time === 0) {
        throw new InternalServerErrorException(result.data);
      }
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

  @UseInterceptors(LoggingInterceptor)
  @Get('')
  async root() {
    throw new NotFoundException();
  }
}
