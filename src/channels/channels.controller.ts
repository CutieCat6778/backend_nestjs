import {
  ChannelsRes,
  UsersRes,
  ChannelRes,
} from './../interfaces/res.interface';
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
import { ChannelsService } from './channels.service';

@Controller('channels')
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @UseInterceptors(LoggingInterceptor)
  @Get('')
  async getAll(): Promise<ChannelsRes> {
    throw new NotFoundException();
  }

  @UseInterceptors(LoggingInterceptor)
  @Get('/id/:id')
  async findUser(
    @Param('id')
    id: string,
  ): Promise<ChannelRes> {
    if (!id) throw new NotAcceptableException();
    const result = await this.channelsService.findById(id);
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
  ): Promise<ChannelsRes> {
    if (!day) throw new NotAcceptableException();
    const result = await this.channelsService.findByDay(day);
    if (result) {
      return result;
    } else {
      throw new NotFoundException();
    }
  }

  @UseInterceptors(LoggingInterceptor)
  @Get('/days/:days')
  async findDays(
    @Param('days')
    day: string,
  ): Promise<UsersRes> {
    if (!day) throw new NotAcceptableException();
    const days = day.split(',').map((a) => parseInt(a));
    const result = await this.channelsService.findByDays(days);
    if (result) {
      return result;
    } else {
      throw new NotFoundException();
    }
  }

  @UseInterceptors(LoggingInterceptor)
  @Get('/top')
  async getTopChannels(): Promise<ChannelsRes> {
    const results = await this.channelsService.topChannels();
    if (results) {
      return results;
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
