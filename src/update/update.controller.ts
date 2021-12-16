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
import { LoggingInterceptor } from 'src/logging.interceptor';
import { UpdateService } from './update.service';

@Controller('update')
export class UpdateController {
  constructor(private service: UpdateService) {}

  @UseInterceptors(LoggingInterceptor)
  @Get('')
  async today(): Promise<any> {
    const datas = await this.service.getDay();
    if (datas) {
      return datas;
    } else {
      throw new NotFoundException();
    }
  }

  @UseInterceptors(LoggingInterceptor)
  @Get('/week')
  async getDays(): Promise<any> {
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
    const data = await this.service.getDay(day);
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
    const data = await this.service.getDay(day, month);
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
    const data = await this.service.getDay(day, month, year);
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
