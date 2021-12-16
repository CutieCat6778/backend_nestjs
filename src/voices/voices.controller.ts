import {
  Controller,
  Get,
  HttpStatus,
  NotAcceptableException,
  NotFoundException,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { VoiceRes } from 'src/interfaces/res.interface';
import { VoicesService } from './voices.service';
import { LoggingInterceptor } from '../logging.interceptor';

@Controller('voices')
export class VoicesController {
  constructor(private service: VoicesService) {}

  @Get('/id/:id')
  async getId(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<VoiceRes> {
    const data = await this.service.getId(id);
    if (data) {
      return data;
    } else {
      throw new NotFoundException();
    }
  }

  @UseInterceptors(LoggingInterceptor)
  @Get('/week')
  async getByDates(): Promise<any> {
    const data = await this.service.getWeek();
    if (data) {
      return data;
    } else {
      throw new NotFoundException();
    }
  }

  @UseInterceptors(LoggingInterceptor)
  @Get('/:day')
  async day(
    @Param(
      'day',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    day: number,
  ): Promise<any> {
    const data = await this.service.getByDate(day);
    if (data) {
      return data;
    } else {
      throw new NotFoundException();
    }
  }

  @UseInterceptors(LoggingInterceptor)
  @Get('/:day/:month')
  async dayAndMonth(
    @Param(
      'day',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    day: number,
    @Param(
      'month',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    month: number,
  ): Promise<any> {
    const data = await this.service.getByDate(day, month);
    if (data) {
      return data;
    } else {
      throw new NotFoundException();
    }
  }

  @UseInterceptors(LoggingInterceptor)
  @Get('/:day/:month/:year')
  async dayAndMonthAndYear(
    @Param(
      'day',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    day: number,
    @Param(
      'month',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    month: number,
    @Param(
      'year',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    year: number,
  ): Promise<any> {
    const data = await this.service.getByDate(day, month, year);
    if (data) {
      return data;
    } else {
      throw new NotFoundException();
    }
  }

  @Get('*')
  returnError() {
    throw new NotAcceptableException();
  }
}
